import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const updateFilename = gql`
  mutation updateFilename($name: String!) {
    updateFilename(name: $name) @client {
      filename
    }
  }
`;
