import gql from "graphql-tag";

export default (_, { name }, { cache }) => {
  const query = gql`
    query GetFilename {
      app @client {
        filename
      }
    }
  `;

  const previousState = cache.readQuery({ query });

  const data = {
    app: {
      ...previousState.app,
      filename: name
    }
  };

  cache.writeQuery({
    query,
    data
  });

  return null;
};
