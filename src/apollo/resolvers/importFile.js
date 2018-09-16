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

        const filename = file.name;
        const nbIndividuals = Object.keys(parsed.individuals).length;
        const nbPlaces = Object.keys(parsed.places).length;

        const query = gql`
          {
            app @client {
              filename
            }
            overview @client {
              nbIndividuals
              nbPlaces
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
            nbPlaces
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
