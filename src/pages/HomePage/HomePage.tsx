// import WrapperContainer from '../../components/stylingComponents/WrapperContainer';
// import { mockRecipes } from '../../mock/recipes';
// import Carousel from '../../components/Carousel';
// import LoadingBar from '../../components/LoadingBar';
// import ErrorMessage from '../../components/ErrorMessage';

import { Container } from '@mantine/core';

const HomePage = () => {
  // const { loading, error, data } = useQuery(GET_RECIPES, {
  //   variables: { limit: 9 },
  // });
  // if (loading) return <LoadingBar />;
  // if (error) return <ErrorMessage />;

  // const recipes = data?.getRecipes?.recipes || [];
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
      <h1>Home Page</h1>
    </Container>
  );
};

export default HomePage;
