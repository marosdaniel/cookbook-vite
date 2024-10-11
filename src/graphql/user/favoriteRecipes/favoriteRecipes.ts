import gql from 'graphql-tag';

const ADD_TO_FAVORITE_RECIPES = gql`
  mutation Mutation($userId: ID!, $recipeId: ID!) {
    addToFavoriteRecipes(userId: $userId, recipeId: $recipeId) {
      success
      message
      statusCode
    }
  }
`;

const REMOVE_FROM_FAVORITE_RECIPES = gql`
  mutation Mutation($userId: ID!, $recipeId: ID!) {
    removeFromFavoriteRecipes(userId: $userId, recipeId: $recipeId) {
      success
      message
      statusCode
    }
  }
`;

export { ADD_TO_FAVORITE_RECIPES, REMOVE_FROM_FAVORITE_RECIPES };
