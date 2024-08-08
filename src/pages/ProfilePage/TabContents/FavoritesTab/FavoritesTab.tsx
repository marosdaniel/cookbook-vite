import { Container, Center, Title } from '@mantine/core';
import RecipeList from '../../../../components/Recipe/RecipeList';
import { useAuthState } from '../../../../store/Auth';

const FavoritesTab = () => {
  const { user } = useAuthState();

  const favoriteRecipes = user?.favoriteRecipes || [];

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
