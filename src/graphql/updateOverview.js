import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const updateOverview = gql`
  mutation updateOverview(
    $nbIndividuals: Int!
    $nbLastName: Int!
    $nbPlaces: Int!
    $popularLastName: String!
    $popularPlace: String!
  ) {
    updateOverview(
      nbIndividuals: $nbIndividuals
      nbLastName: $nbLastName
      nbPlaces: $nbPlaces
      popularLastName: $popularLastName
      popularPlace: $popularPlace
    ) @client {
      nbIndividuals
      nbLastName
      nbPlaces
      popularLastName
      popularPlace
    }
  }
`;
