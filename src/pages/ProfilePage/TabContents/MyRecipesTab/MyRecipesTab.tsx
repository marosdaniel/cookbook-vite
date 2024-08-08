import { useQuery } from '@apollo/client';
import { Alert, Center, Container, Title } from '@mantine/core';

import { TRecipe } from '../../../../store/Recipe/types';
import { useAuthState } from '../../../../store/Auth';
import { GET_RECIPES_BY_USER_NAME } from '../../../../graphql/recipe/getRecipes';
import RecipeList from '../../../../components/Recipe/RecipeList';

const MyRecipesTab = () => {
  const { user } = useAuthState();
  const { error, data } = useQuery(GET_RECIPES_BY_USER_NAME, {
    variables: { userName: user?.userName },
  });

  const recipes: TRecipe[] = data?.getRecipesByUserName.recipes || [];
  console.log(recipes);

  return (
    <Container id="my-recipes" mt="xl">
      {recipes?.length > 0 ? (
        <RecipeList recipes={recipes} />
      ) : (
        <Center h={200}>
          <Title order={4}>You haven't added any recipes</Title>
        </Center>
      )}
      {!!error?.message ?? (
        <Alert mt="md" color="red">
          {error?.message ?? 'An error occurred while fetching recipes'}
        </Alert>
      )}
    </Container>
  );
};

export default MyRecipesTab;
