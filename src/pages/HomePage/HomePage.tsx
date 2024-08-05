import { useQuery } from '@apollo/client';
import { Container, Title } from '@mantine/core';
import { GET_RECIPES } from '../../graphql/recipe/getRecipes';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES, {
    variables: { limit: 9 },
  });
  // if (loading) return <LoadingBar />;
  // if (error) return <ErrorMessage />;

  const recipes = data?.getRecipes?.recipes || [];
  return (
    // <WrapperContainer id="home-page" maxWidth="xl">
    //   <Typography variant="h4" component="h2">
    //     popular recipes /sample/
    //   </Typography>
    //   <Carousel recipes={mockRecipes} />
    //   <Typography variant="h4" component="h2">
    //     Recently added recipes
    //   </Typography>
    //   <Carousel recipes={recipes} />
    // </WrapperContainer>
    <Container size="xl" id="home-page">
      <Title order={1}>popular recipes /mock/</Title>
      {/* <Carousel recipes={mockRecipes} /> */}

      <Title order={1}>Recently added recipes</Title>
      {/* <Carousel recipes={recipes} /> */}
    </Container>
  );
};

export default HomePage;
