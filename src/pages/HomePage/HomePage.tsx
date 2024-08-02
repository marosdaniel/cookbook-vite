import { useQuery } from '@apollo/client';

// import WrapperContainer from '../../components/stylingComponents/WrapperContainer';
// import { mockRecipes } from '../../mock/recipes';
// import Carousel from '../../components/Carousel';
// import LoadingBar from '../../components/LoadingBar';
// import ErrorMessage from '../../components/ErrorMessage';
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
    <div>home page</div>
  );
};

export default HomePage;
