import { useQuery } from '@apollo/client';
import { Container, Center, Title } from '@mantine/core';
import RecipeList from '../../../../components/Recipe/RecipeList';
import { useAuthState } from '../../../../store/Auth';
import { GET_FAVORITE_RECIPES } from '../../../../graphql/user/getFavoriteRecipes';
import { TRecipe } from '../../../../store/Recipe/types';

const FavoritesTab = () => {
  const { user } = useAuthState();
  const { data, loading } = useQuery<{ getFavoriteRecipes: TRecipe[] | [] }>(GET_FAVORITE_RECIPES, {
    variables: { userId: user?._id ?? '' },
  });

  const favoriteRecipes = data?.getFavoriteRecipes || [];

  return (
    <Container id="my-recipes" mt="xl">
      {favoriteRecipes?.length > 0 ? (
        <RecipeList recipes={favoriteRecipes} />
      ) : (
        <Center h={200}>
          <Title order={4}>You haven't choosen any favorites</Title>
        </Center>
      )}
      {/* {!!error?.message ?? (
        <Alert mt="md" color="red">
          {error?.message ?? 'An error occurred while fetching recipes'}
        </Alert>
      )} */}
    </Container>
  );
};

export default FavoritesTab;
