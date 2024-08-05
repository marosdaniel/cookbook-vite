import { useQuery } from '@apollo/client';

import { TRecipe } from '../../../../store/Recipe/types';
import { useAuthState } from '../../../../store/Auth';
import RecipeList from '../../../../components/Recipe/RecipeList';
import { GET_RECIPES_BY_USER_NAME } from '../../../../graphql/recipe/getRecipes';

const MyRecipesTab = () => {
  const { user } = useAuthState();
  const userName = user?.userName || '';
  const { loading, error, data } = useQuery(GET_RECIPES_BY_USER_NAME, {
    variables: { userName } as { userName: string },
  });

  const recipes: TRecipe[] = data?.getRecipesByUserName.recipes || [];

  return (
    <section id="my-recipes">
      {recipes?.length > 0 ? <RecipeList recipes={recipes} /> : <div>You haven't added any recipes</div>}
    </section>
  );
};

export default MyRecipesTab;
