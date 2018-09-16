import gql from "graphql-tag";

export default (_, { nbIndividuals, nbPlaces }, { cache }) => {
  const query = gql`
    query GetOverview {
      overview @client {
        nbIndividuals
        nbPlaces
      }
    }
  `;

  const previousState = cache.readQuery({ query });

  const data = {
    overview: {
      ...previousState.overview,
      nbIndividuals,
      nbPlaces
    }
  };

  cache.writeQuery({
    query,
    data
  });

  return null;
};
