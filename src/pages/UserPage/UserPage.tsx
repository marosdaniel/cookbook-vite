import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Title } from '@mantine/core';

import { GET_USER_BY_USERNAME } from '../../graphql/user/getUser';
import { TRecipe } from '../../store/Recipe/types';
import RecipeList from '../../components/Recipe/RecipeList';
import Seo from '../../components/Seo';

const UserPage = () => {
  const { userName } = useParams<{ userName: string }>();

  const { data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { userName } as { userName: string },
  });

  const recipes: TRecipe[] = data?.getUserByUserName.recipes || [];
  const title = recipes.length ? `Best recipes from ${userName}'s kitchen` : `${userName} has no recipes yet`;

  return (
    <Container
      size="xl"
      id="user-page"
      p={{
        base: 'xs',
        md: 'md',
      }}
    >
      <Seo
        title={`Cookbook - ${userName}'s recipes`}
        description="Cookbook is a platform where you can share your recipes with the world. Start crafting your own cookbook today!"
        keywords="cookbook, recipes, cooking, food, sharing, community"
        type="website"
        name="Cookbook"
        url={`https://cookbook-vite.vercel.app/users/${userName}`}
        canonicalUrl={`https://cookbook-vite.vercel.app/users/${userName}`}
        locale="en_GB"
      />
      <Title order={4} mb="lg">
        {title}
      </Title>
      {recipes.length ? <RecipeList recipes={recipes} /> : null}
    </Container>
  );
};

export default UserPage;
