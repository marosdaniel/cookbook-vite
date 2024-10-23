import gql from 'graphql-tag';

const RATE_RECIPE = gql`
  mutation Mutation($ratingInput: RatingInput!) {
    rateRecipe(ratingInput: $ratingInput) {
      _id
      title
      ratingsCount
      userRating
      createdAt
      averageRating
    }
  }
`;

export { RATE_RECIPE };
