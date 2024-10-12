import { useMutation } from '@apollo/client';
import { ActionIcon, Anchor, Avatar, Badge, Card, Center, Group, Image, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { LuHeart } from 'react-icons/lu';
import { Link as RouterLink } from 'react-router-dom';

import { ADD_TO_FAVORITE_RECIPES, REMOVE_FROM_FAVORITE_RECIPES } from '../../../graphql/user/favoriteRecipes';
import { useAuthState } from '../../../store/Auth';

import { getHost } from '../../../utils/getHost';
import { ENonProtectedRoutes } from '../../../router/types';
import CopyActionButton from '../../CopyActionButton';
import { IProps } from './types';

const RecipeCard = ({ title, description, createdBy, id, imgSrc, isFavorite: initialIsFavorite }: IProps) => {
  const { user } = useAuthState();
  const userId = user?._id ?? '';
  const recipePath = `${getHost()}${ENonProtectedRoutes.RECIPES}/${id}`;

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const [addToFavoriteRecipes, { loading: addFavLoading }] = useMutation(ADD_TO_FAVORITE_RECIPES, {
    variables: { userId, recipeId: id.toString() },

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

  const linkToUser = (userName: string) => (
    <Anchor
      size="sm"
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      component={RouterLink}
      to={`/users/${userName}`}
    >
      {userName}
    </Anchor>
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavoriteRecipes();
    } else {
      addToFavoriteRecipes();
    }
  };

  return (
    <Card radius="md" h={400} shadow="lg" bg="gray.0">
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
            {linkToUser(createdBy)}
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
