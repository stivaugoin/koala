import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const updateOverview = gql`
  mutation updateOverview($nbIndividuals: Int!, $nbPlaces: Int!) {
    updateOverview(nbIndividuals: $nbIndividuals, nbPlaces: $nbPlaces) @client {
      nbIndividuals
      nbPlaces
    }
  }
`;
