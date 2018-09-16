import gedcom from "gedcom-js";

import { client } from "../apollo";
import { updateFilename, updateOverview } from "../graphql";

const importFile = input =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    if (typeof window.FileReader !== "function") {
      reject(new Error("The file API isn't supported on this browser."));
    }

    if (!input) {
      reject(
        new Error("The browser does not properly implement the event object")
      );
    }

    if (!input.files) {
      reject(
        new Error(
          "This browser does not support the `files` property of the file input."
        )
      );
    }

    if (input.files[0]) {
      const file = input.files[0];

      const filename = file.name;
      client.mutate({
        mutation: updateFilename,
        variables: {
          name: filename
        }
      });

      // eslint-disable-next-line no-undef
      const fileReader = new FileReader();

      fileReader.onload = async fileContent => {
        const { result } = fileContent.currentTarget;
        const parsed = gedcom.parse(result);
        console.log(parsed);

        client.mutate({
          mutation: updateOverview,
          variables: {
            nbIndividuals: Object.keys(parsed.individuals).length,
            nbPlaces: Object.keys(parsed.places).length
          }
        });

        resolve();
      };

      fileReader.readAsText(file);
    }
  });

export default importFile;
