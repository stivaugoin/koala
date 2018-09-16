import { client } from "../apollo";
import { updateFilename, updateOverview } from "../graphql";

const closeFile = () =>
  new Promise((resolve, reject) => {
    try {
      client.mutate({
        mutation: updateFilename,
        variables: {
          name: ""
        }
      });

      client.mutate({
        mutation: updateOverview,
        variables: {
          nbIndividuals: 0,
          nbPlaces: 0
        }
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });

export default closeFile;
