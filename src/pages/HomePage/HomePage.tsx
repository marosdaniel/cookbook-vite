import { useQuery } from '@apollo/client';
import { Container, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { GET_RECIPES } from '../../graphql/recipe/getRecipes';
import { mockRecipes } from '../../mock/recipes';
import { TRecipe } from '../../store/Recipe/types';
import RecipeCard from '../../components/Recipe/RecipeCard';
import Seo from '../../components/Seo';

import classes from './HomePage.module.css';

const HomePage = () => {
  const { data } = useQuery(GET_RECIPES, {
    variables: { limit: 9 },
    fetchPolicy: 'cache-and-network',
  });

  const recipes: Partial<TRecipe>[] = data?.getRecipes?.recipes || [];

  return (
    <Container
      size="xl"
      id="home-page"
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
        url="https://cookbook-vite.vercel.app"
        canonicalUrl="https://cookbook-vite.vercel.app"
        locale="en_GB"
      />
      <Title order={2} mb="lg">
        Popular recipes /mock/
      </Title>
      <Carousel
        classNames={classes}
        withIndicators
        controlSize={36}
        slideSize={{ base: '100%', md: '50%', lg: '33%' }}
        slideGap={{ base: 0, sm: 'md' }}
        loop
        align="start"
      >
        {mockRecipes.map(recipe => (
          <Carousel.Slide key={recipe._id} p={'32px 12px'}>
            <RecipeCard
              title={recipe.title}
              description={recipe.description}
              createdBy={recipe.createdBy}
              id={recipe._id || ''}
              averageRating={recipe.averageRating ?? 0}
              ratingsCount={recipe.ratingsCount}
              disableClick
            />
          </Carousel.Slide>
        ))}
      </Carousel>

      <Title order={2} mb="lg" mt="xl">
        Recently added recipes
      </Title>

      <Carousel
        classNames={classes}
        withIndicators
        controlSize={36}
        slideSize={{ base: '100%', md: '50%', lg: '33%' }}
        slideGap={{ base: 0, sm: 'md' }}
        loop
        align="start"
      >
        {recipes.map(recipe => (
          <Carousel.Slide key={recipe._id} p={'32px 12px'}>
            <RecipeCard
              title={recipe.title || ''}
              description={recipe.description || ''}
              createdBy={recipe.createdBy || 'Anonymous'}
              id={recipe._id!}
              imgSrc={recipe.imgSrc}
              isFavorite={recipe.isFavorite}
              averageRating={recipe.averageRating ?? 0}
              ratingsCount={recipe.ratingsCount ?? 0}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default HomePage;
