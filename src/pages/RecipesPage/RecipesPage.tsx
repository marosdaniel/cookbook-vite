import { useQuery } from '@apollo/client';

import { GET_RECIPES } from '../../graphql/recipe/getRecipes';
import { TRecipe } from '../../store/Recipe/types';

import { Container } from '@mantine/core';

const RecipesPage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);

  const recipes: TRecipe[] = data?.getRecipes?.recipes || [];

  return (
    // <WrapperContainer id="recipes-page">
    //   <PageTitle title="Find the best recipes" />
    //   <Box sx={recipePageContentStyles}>
    //     <Box sx={filterWrapperStyles}>
    //       <FilterBar />
    //     </Box>
    //     <Box sx={recipeListWrapper}>
    //       <RecipeList recipes={recipes} />
    //     </Box>
    //   </Box>
    // </WrapperContainer>
    <Container size="xl" id="recipes-page">
      {/* <RecipeList recipes={recipes} /> */}
      <h1>recipe list</h1>
    </Container>
  );
};

export default RecipesPage;
