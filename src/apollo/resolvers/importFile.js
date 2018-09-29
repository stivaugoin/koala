import gedcom from "gedcom-js";
import gql from "graphql-tag";

export default async (_, { file }, { cache }) =>
  new Promise(resolve => {
    if (file) {
      // eslint-disable-next-line no-undef
      const fileReader = new FileReader();
      fileReader.onload = async fileContent => {
        const { result } = fileContent.currentTarget;
        const parsed = gedcom.parse(result);

        console.log(parsed);

        const filename = file.name;
        const nbIndividuals = Object.keys(parsed.individuals).length;
        const nbPlaces = Object.keys(parsed.places).length;

        const lastName = new Map();
        parsed.individuals.forEach(individual => {
          const { names } = individual;

          if (names) {
            names.forEach(({ lname }) => {
              const countLastName = lastName.get(lname) || 0;

              lastName.set(lname, countLastName + 1);
            });
          }
        });

        const lastNameObj = [];
        lastName.forEach((count, lname) => {
          lastNameObj.push({ lname, count });
        });

        const nbLastName = lastName.size;
        const popularLastName = lastNameObj.sort((a, b) => {
          if (a.count > b.count) return -1;
          if (a.count < b.count) return 1;
          return 0;
        })[0].lname;

        const popularPlace = parsed.places.sort((a, b) => {
          if (a.count > b.count) return -1;
          if (a.count < b.count) return 1;
          return 0;
        })[0].name;

        const query = gql`
          {
            app @client {
              filename
            }
            overview @client {
              nbIndividuals
              nbLastName
              nbPlaces
              popularLastName
              popularPlace
            }
          }
        `;

        const previousState = cache.readQuery({ query });

        const data = {
          app: {
            ...previousState.app,
            filename
          },
          overview: {
            ...previousState.overview,
            nbIndividuals,
            nbLastName,
            nbPlaces,
            popularLastName,
            popularPlace
          }
        };

        await cache.writeQuery({
          query,
          data
        });

        return resolve({});
      };

      fileReader.readAsText(file);
    }
  });
