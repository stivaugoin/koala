import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const getOverviewQuery = gql`
  query {
    overview @client {
      nbIndividuals
      nbPlaces
    }
  }
`;
