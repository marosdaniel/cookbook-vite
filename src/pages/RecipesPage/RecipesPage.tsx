import { useQuery } from '@apollo/client';
import { Center, Container, Loader, Title } from '@mantine/core';

import { GET_RECIPES } from '../../graphql/recipe/getRecipes';
import { TRecipe } from '../../store/Recipe/types';
import RecipeList from '../../components/Recipe/RecipeList';

const RecipesPage = () => {
  const { loading, data } = useQuery(GET_RECIPES);

  const recipes: TRecipe[] = data?.getRecipes?.recipes || [];

  return (
    <Container
      size="xl"
      id="recipes-page"
      p={{
        base: 'xs',
        md: 'md',
      }}
    >
      <Title order={2} mb="lg">
        Find the best recipes
      </Title>
      {!loading ? (
        <RecipeList recipes={recipes} />
      ) : (
        <Center h="384px">
          <Loader type="dots" />
          {/* {error?.message ?? (
            <Alert mt="md" color="red">
              {error?.message ?? 'An error occurred while fetching recipes'}
            </Alert>
          )} */}
        </Center>
      )}
    </Container>
  );
};

export default RecipesPage;
