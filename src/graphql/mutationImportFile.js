import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const mutationImportFile = gql`
  mutation importFile($file: Upload!) {
    importFile(file: $file) @client
  }
`;
