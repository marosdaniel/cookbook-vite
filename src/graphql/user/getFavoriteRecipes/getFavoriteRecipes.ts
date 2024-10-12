import gql from 'graphql-tag';

const GET_FAVORITE_RECIPES = gql`
  query Query($userId: ID!) {
    getFavoriteRecipes(userId: $userId) {
      title
      createdBy
      imgSrc
      averageRating
      ratingsCount
      description
      isFavorite
      _id
    }
  }
`;

export { GET_FAVORITE_RECIPES };
