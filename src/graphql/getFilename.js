import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const getFilenameQuery = gql`
  query {
    app @client {
      filename
    }
  }
`;
