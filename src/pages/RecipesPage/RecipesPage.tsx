import { useQuery } from '@apollo/client';
import { Alert, Center, Container, Grid, Loader, Title } from '@mantine/core';

import { GET_RECIPES } from '../../graphql/recipe/getRecipes';
import { TRecipe } from '../../store/Recipe/types';
import RecipeCard from '../../components/Recipe/RecipeCard';

const RecipesPage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);

  const recipes: TRecipe[] = data?.getRecipes?.recipes || [];

  return (
    <Container size="xl" id="recipes-page">
      <Title order={2} mb="lg">
        Find the best recipes
      </Title>
      {!loading ? (
        <Grid>
          {recipes.map(recipe => (
            <Grid.Col
              span={{
                sm: 12,
                md: 6,
                lg: 4,
              }}
            >
              <RecipeCard
                key={recipe._id}
                title={recipe.title}
                description={recipe.description}
                createdBy={recipe.createdBy}
                id={recipe._id}
              />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Center h="384px">
          <Loader type="dots" />
          {error?.message ?? (
            <Alert mt="md" color="red">
              {error?.message ?? 'An error occurred while fetching recipes'}
            </Alert>
          )}
        </Center>
      )}
    </Container>
  );
};

export default RecipesPage;
