import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'clsx';
import { gql, useMutation } from '@apollo/client';
import { ActionIcon, Avatar, Badge, Card, Center, Group, Image, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FaHeart } from 'react-icons/fa';
import { LuHeart } from 'react-icons/lu';

import { ADD_TO_FAVORITE_RECIPES, REMOVE_FROM_FAVORITE_RECIPES } from '../../../graphql/user/favoriteRecipes';
import { useAuthState } from '../../../store/Auth';

import { getHost } from '../../../utils/getHost';
import { ENonProtectedRoutes } from '../../../router/types';
import { GET_FAVORITE_RECIPES } from '../../../graphql/user/getFavoriteRecipes';
import { GET_RECIPES_BY_USER_NAME } from '../../../graphql/recipe/getRecipes';
import { useGlobalState } from '../../../store/Global';
import CopyActionButton from '../../CopyActionButton';
import LinkToUser from '../../LinkToUser';
import { IProps } from './types';

import classes from './RecipeCard.module.css';

const RecipeCard = ({ title, description, createdBy, id, imgSrc, isFavorite: initialIsFavorite }: IProps) => {
  const { isDarkMode } = useGlobalState();

  const wrapperClasses = cx({
    [classes.dark]: isDarkMode,
  });
  const { user } = useAuthState();
  const userId = user?._id ?? '';
  const recipePath = `${getHost()}${ENonProtectedRoutes.RECIPES}/${id}`;

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
          variables: { userName: user?.userName },
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
            variables: { userName: user?.userName },
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
        title: 'Recipe added to favorites',
        message: 'Your recipe has been successfully added to favorites',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
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
          variables: { userName: user?.userName },
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
            variables: { userName: user?.userName },
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
        title: 'Recipe removed from favorites',
        message: 'Your recipe has been successfully removed from favorites',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'An error occurred while removing recipe from favorites',
        color: 'red',
      });
    },
  });

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavoriteRecipes();
    } else {
      addToFavoriteRecipes();
    }
  };

  return (
    <Card radius="md" h={400} shadow="lg" bg="gray.0" className={wrapperClasses}>
      <Card.Section>
        <RouterLink to={`${ENonProtectedRoutes.RECIPES}/${id}`}>
          <Image src={imgSrc ?? 'https://cdn-icons-png.flaticon.com/256/6039/6039575.png'} height={180} fit="contain" />
        </RouterLink>
      </Card.Section>

      <Badge size="sm" variant="gradient" gradient={{ from: 'yellow', to: 'red' }} mt={'md'}>
        outstanding
      </Badge>

      <Text fw={500} component={RouterLink} to={`/recipes/${id}`} mt={'md'}>
        {title}
      </Text>

      <Text fz="xs" c="dimmed" lineClamp={4} mt={'md'}>
        {description}
      </Text>

      <Group justify="space-between" mt={'md'}>
        <Center>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            <LinkToUser userName={createdBy} />
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          {user?._id && (
            <ActionIcon variant="transparent" color="red.6" size="sm" loading={addFavLoading || removeFavLoading}>
              {isFavorite ? (
                <FaHeart style={{ width: '100%', height: '100%' }} onClick={toggleFavorite} />
              ) : (
                <LuHeart style={{ width: '100%', height: '100%' }} onClick={toggleFavorite} />
              )}
            </ActionIcon>
          )}
          <ActionIcon variant="transparent">
            <CopyActionButton path={recipePath} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};

export default RecipeCard;
