import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_USER_BY_USERNAME } from '../../graphql/user/getUser';
import { TRecipe } from '../../store/Recipe/types';
import { Container } from '@mantine/core';

const UserPage = () => {
  const { userName } = useParams<{ userName: string }>();

  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { userName } as { userName: string },
  });

  const recipes: TRecipe[] = data?.getUserByUserName.recipes || [];
  const title = recipes.length ? `best recipes from ${userName}'s kitchen` : `${userName} has no recipes yet`;

  return (
    // <WrapperContainer id="user-page">
    //   <PageTitle title={title} />
    //   {recipes.length ? <RecipeList recipes={recipes} /> : null}
    // </WrapperContainer>
    <Container
      size="xl"
      id="user-page"
      p={{
        base: 'xs',
        md: 'md',
      }}
    >
      <h1>user page for visitor</h1>
    </Container>
  );
};

export default UserPage;
