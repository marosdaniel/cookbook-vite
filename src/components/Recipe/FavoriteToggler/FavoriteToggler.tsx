import { useState } from 'react';
import { useIntl } from 'react-intl';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FaHeart } from 'react-icons/fa';
import { LuHeart } from 'react-icons/lu';

import { responseMessages } from '../../../messages';
import { GET_RECIPES_BY_USER_NAME } from '../../../graphql/recipe/getRecipes';
import { ADD_TO_FAVORITE_RECIPES, REMOVE_FROM_FAVORITE_RECIPES } from '../../../graphql/user/favoriteRecipes';
import { GET_FAVORITE_RECIPES } from '../../../graphql/user/getFavoriteRecipes';
import { IProps } from './types';

const FavoriteToggler = ({ userId, id, initialIsFavorite, userName, disableClick = false }: IProps) => {
  const { formatMessage } = useIntl();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const [addToFavoriteRecipes, { loading: addFavLoading }] = useMutation(ADD_TO_FAVORITE_RECIPES, {
    variables: { userId, recipeId: id.toString() },
    update: (cache, { data: { addToFavoriteRecipes } }) => {
      // Update GET_FAVORITE_RECIPES
      try {
        const data = cache.readQuery<{ getFavoriteRecipes: any[] }>({
          query: GET_FAVORITE_RECIPES,
          variables: { userId },
        });

        if (data) {
          // Write the updated favorites list back to the cache
          cache.writeQuery({
            query: GET_FAVORITE_RECIPES,
            variables: { userId },
            data: {
              getFavoriteRecipes: [...data.getFavoriteRecipes, addToFavoriteRecipes],
            },
          });
        }
      } catch (error) {
        // Handle the case where GET_FAVORITE_RECIPES hasn't been run yet
      }

      // Update GET_RECIPES_BY_USER_NAME
      try {
        const data = cache.readQuery<{ getRecipesByUserName: any[] }>({
          query: GET_RECIPES_BY_USER_NAME,
          variables: { userName },
        });

        if (data) {
          const updatedRecipes = data.getRecipesByUserName.map(recipe => {
            if (recipe.id === addToFavoriteRecipes.id) {
              return {
                ...recipe,
                isFavorite: true,
              };
            }
            return recipe;
          });

          cache.writeQuery({
            query: GET_RECIPES_BY_USER_NAME,
            variables: { userName },
            data: {
              getRecipesByUserName: updatedRecipes,
            },
          });
        }
      } catch (error) {
        // Handle the case where GET_RECIPES_BY_USER_NAME hasn't been run yet
      }

      // Optionally update the specific Recipe object
      cache.writeFragment({
        id: cache.identify({ __typename: 'Recipe', id }),
        fragment: gql`
          fragment UpdateFavorite on Recipe {
            isFavorite
          }
        `,
        data: {
          isFavorite: true,
        },
      });
    },

    onCompleted: () => {
      setIsFavorite(true);
      notifications.show({
        title: formatMessage(responseMessages.success),
        message: 'Your recipe has been successfully added to favorites',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: formatMessage(responseMessages.error),
        message: 'An error occurred while adding recipe to favorites',
        color: 'red',
      });
    },
  });

  const [removeFromFavoriteRecipes, { loading: removeFavLoading }] = useMutation(REMOVE_FROM_FAVORITE_RECIPES, {
    variables: { userId, recipeId: id.toString() },
    update: (cache, { data: { removeFromFavoriteRecipes } }) => {
      // Update GET_FAVORITE_RECIPES
      try {
        const data = cache.readQuery<{ getFavoriteRecipes: any[] }>({
          query: GET_FAVORITE_RECIPES,
          variables: { userId },
        });

        if (data) {
          const newFavorites = data.getFavoriteRecipes.filter(recipe => recipe.id !== removeFromFavoriteRecipes.id);

          cache.writeQuery({
            query: GET_FAVORITE_RECIPES,
            variables: { userId },
            data: {
              getFavoriteRecipes: newFavorites,
            },
          });
        }
      } catch (error) {
        // Handle the case where the query hasn't been run yet
      }

      // Update GET_RECIPES_BY_USER_NAME
      try {
        const data = cache.readQuery<{ getRecipesByUserName: any[] }>({
          query: GET_RECIPES_BY_USER_NAME,
          variables: { userName },
        });

        if (data) {
          const updatedRecipes = data.getRecipesByUserName.map(recipe => {
            if (recipe.id === removeFromFavoriteRecipes.id) {
              return {
                ...recipe,
                isFavorite: false,
              };
            }
            return recipe;
          });

          cache.writeQuery({
            query: GET_RECIPES_BY_USER_NAME,
            variables: { userName },
            data: {
              getRecipesByUserName: updatedRecipes,
            },
          });
        }
      } catch (error) {
        // Handle the case where the query hasn't been run yet
      }

      // Optionally update the specific Recipe object
      cache.writeFragment({
        id: cache.identify({ __typename: 'Recipe', id }),
        fragment: gql`
          fragment UpdateFavorite on Recipe {
            isFavorite
          }
        `,
        data: {
          isFavorite: false,
        },
      });
    },
    onCompleted: () => {
      setIsFavorite(false);
      notifications.show({
        title: formatMessage(responseMessages.success),
        message: 'Your recipe has been successfully removed from favorites',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: formatMessage(responseMessages.error),
        message: 'An error occurred while removing recipe from favorites',
        color: 'red',
      });
    },
  });

  const toggleFavorite = () => {
    if (disableClick) return;
    if (isFavorite) {
      removeFromFavoriteRecipes();
    } else {
      addToFavoriteRecipes();
    }
  };
  return (
    <ActionIcon variant="transparent" color="red.6" size="sm" loading={addFavLoading || removeFavLoading}>
      {isFavorite ? (
        <FaHeart style={{ width: '100%', height: '100%' }} onClick={toggleFavorite} />
      ) : (
        <LuHeart style={{ width: '100%', height: '100%' }} onClick={toggleFavorite} />
      )}
    </ActionIcon>
  );
};

export default FavoriteToggler;
