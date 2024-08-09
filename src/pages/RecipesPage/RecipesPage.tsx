import { useQuery } from '@apollo/client';
import { Center, Container, Loader, Title } from '@mantine/core';

import { GET_RECIPES } from '../../graphql/recipe/getRecipes';
import { TRecipe } from '../../store/Recipe/types';
import RecipeList from '../../components/Recipe/RecipeList';
import Seo from '../../components/Seo';

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
      <Seo
        title="Cookbook - Where the the recipes turn into magic!"
        description="Cookbook is a platform where you can share your recipes with the world. Start crafting your own cookbook today!"
        keywords="cookbook, recipes, cooking, food, sharing, community"
        type="website"
        name="Cookbook"
        url="https://cookbook-vite.vercel.app/recipes"
        canonicalUrl="https://cookbook-vite.vercel.app/recipes"
        locale="en_GB"
      />
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
