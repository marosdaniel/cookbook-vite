import { useQuery } from '@apollo/client';
import { Container, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useViewportSize } from '@mantine/hooks';

import { GET_RECIPES } from '../../graphql/recipe/getRecipes';
import { mockRecipes } from '../../mock/recipes';
import RecipeCard from '../../components/Recipe/RecipeCard';
import { TRecipe } from '../../store/Recipe/types';

const HomePage = () => {
  const { width } = useViewportSize();
  const { loading, error, data } = useQuery(GET_RECIPES, {
    variables: { limit: 9 },
  });
  // if (loading) return <LoadingBar />;
  // if (error) return <ErrorMessage />;

  const recipes: Partial<TRecipe>[] = data?.getRecipes?.recipes || [];
  const getIndicatorsOnBreakpoint = () => {
    if (width < 768) return false;
    if (width < 992 && recipes.length < 3) return false;
    return true;
  };
  return (
    <Container size="xl" id="home-page" flex={1}>
      <Title order={2} mb={'lg'}>
        popular recipes /mock/
      </Title>
      <Carousel
        withIndicators
        controlSize={36}
        height="100%"
        slideSize={{ base: '100%', md: '50%', lg: '33%' }}
        slideGap={{ base: 0, sm: 'md' }}
        loop
        align="start"
      >
        {mockRecipes.map(recipe => (
          <Carousel.Slide key={recipe._id}>
            <RecipeCard
              title={recipe.title}
              description={recipe.description}
              createdBy={recipe.createdBy}
              id={recipe._id}
            />
          </Carousel.Slide>
        ))}
      </Carousel>

      <Title order={2} mb={'lg'}>
        Recently added recipes
      </Title>
      {/* <Carousel recipes={recipes} /> */}
      <Carousel
        withIndicators={getIndicatorsOnBreakpoint()}
        controlSize={36}
        height="100%"
        slideSize={{ base: '100%', md: '50%', lg: '33%' }}
        slideGap={{ base: 0, sm: 'md' }}
        loop
        align="start"
      >
        {recipes.map(recipe => (
          <Carousel.Slide key={recipe._id}>
            <RecipeCard
              title={recipe.title || ''}
              description={recipe.description || ''}
              createdBy={recipe.createdBy || ''}
              id={recipe._id!}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default HomePage;
