import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Card, Badge, Group, Center, Avatar, ActionIcon, Image, Text, Anchor } from '@mantine/core';
import { FaHeart } from 'react-icons/fa';
import { LuHeart } from 'react-icons/lu';
import { ADD_TO_FAVORITE_RECIPES, REMOVE_FROM_FAVORITE_RECIPES } from '../../../graphql/user/favoriteRecipes';
import { useAuthState } from '../../../store/Auth';

import { IProps } from './types';

const RecipeCard = ({ title, description, createdBy, id, imgSrc, isFavorite }: IProps) => {
  const { user } = useAuthState();
  const userId = user?._id ?? '';

  const [addToFavoriteRecipes] = useMutation(ADD_TO_FAVORITE_RECIPES, {
    variables: { userId, recipeId: id },
    update(cache, { data }) {
      cache.modify({
        fields: {
          getFavoriteRecipes(existingRecipes = []) {
            return [...existingRecipes, data?.addToFavorites];
          },
        },
      });
    },
    onCompleted: () => {
      console.log('Recipe added to favorites');
    },
    onError: error => {
      console.error('Error while adding recipe to favorites', error);
    },
  });

  const [removeFromFavoriteRecipes] = useMutation(REMOVE_FROM_FAVORITE_RECIPES, {
    variables: { userId, recipeId: id },
    update(cache, { data }) {
      cache.modify({
        fields: {
          getFavoriteRecipes(existingRecipes = []) {
            return existingRecipes.filter((recipe: any) => recipe._id !== data?.removeFromFavorites);
          },
        },
      });
    },
    onCompleted: () => {
      console.log('Recipe removed from favorites');
    },
    onError: error => {
      console.error('Error while removing recipe from favorites', error);
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
  return (
    <Card radius="md" h={400} shadow="lg" bg="gray.0">
      <Card.Section>
        <RouterLink to={`/recipes/${id}`}>
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
            <ActionIcon variant="transparent" color="red.6" size="sm">
              {isFavorite ? (
                <FaHeart style={{ width: '100%', height: '100%' }} onClick={() => addToFavoriteRecipes} />
              ) : (
                <LuHeart style={{ width: '100%', height: '100%' }} onClick={() => removeFromFavoriteRecipes} />
              )}
            </ActionIcon>
          )}
          <ActionIcon>
            {/* <IconBookmark style={{ width: rem(16), height: rem(16) }} color={theme.colors.yellow[7]} /> */}
          </ActionIcon>
          <ActionIcon>
            {/* <IconShare style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} /> */}
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};

export default RecipeCard;
