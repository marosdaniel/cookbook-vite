import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useAppDispatch } from '../../store/hooks';
import { setEditRecipe } from '../../store/Recipe/recipe';
import { TRecipe } from '../../store/Recipe/types';
import { GET_RECIPE_BY_ID } from '../../graphql/recipe/getRecipes';
import { useAuthState } from '../../store/Auth';

import { IRecipeDetailsData } from './types';
import { Container } from '@mantine/core';

const RecipeDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { user } = useAuthState();
  const { loading, error, data } = useQuery<IRecipeDetailsData>(GET_RECIPE_BY_ID, {
    variables: { id } as { id: string },
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const recipe: TRecipe | undefined = data?.getRecipeById;

  const {
    title,
    createdBy,
    description,
    imgSrc,
    preparationSteps,
    ingredients,
    updatedAt,
    category,
    cookingTime,
    createdAt,
    difficultyLevel,
    labels,
    servings,
    youtubeLink,
  } = recipe || {};

  const isLabels = labels && labels?.length > 0;
  const isOwnRecipe = data?.getRecipeById.createdBy === user?.userName;
  const formattedCreatedAt = new Date(createdAt || Date.now())?.toLocaleDateString();
  const formattedUpdatedAt = new Date(updatedAt || Date.now())?.toLocaleDateString();

  const handleEdit = () => {
    if (recipe?.title) {
      dispatch(setEditRecipe(recipe));
      setIsEditMode(true);
    }
  };

  // const linkToCreator = (
  //   <Link component={RouterLink} to={`${ENonProtectedRoutes.USERS}/${createdBy}`}>
  //     {createdBy}
  //   </Link>
  // );

  // const categoryLink = (
  //   <Link component={RouterLink} to={`${ENonProtectedRoutes.RECIPES}/?category=${category?.key}`}>
  //     {category?.label}
  //   </Link>
  // );

  const orderedPreparationSteps =
    preparationSteps!.length > 0
      ? preparationSteps?.filter(step => typeof step.order === 'number').sort((a, b) => a.order - b.order)
      : [];

  if (isEditMode) {
    // return <RecipeFormEditor isEditMode setIsEditMode={setIsEditMode} />;
  }

  return (
    // <WrapperContainer
    //   id="recipe-detail-page"
    //   maxWidth="lg"
    //   additionalStyles={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '0 auto' }}
    // >
    //   <Paper elevation={3} sx={imageWrapperStyles}>
    //     <Image
    //       src={imgSrc || fallbackImage}
    //       shift="right"
    //       distance="2rem"
    //       shiftDuration={620}
    //       showLoading={<LoadingBar />}
    //       width={'100%'}
    //       alt="recipe image"
    //     />
    //   </Paper>

    //   <Typography fontStyle={'italic'} variant="subtitle2">
    //     a {categoryLink} from {linkToCreator}'s kitchen
    //   </Typography>
    //   <Box display="flex" justifyContent="space-between" alignItems="flex-start">
    //     <PageTitle title={title ?? ''} />
    //     <Box display="flex" alignItems="center">
    //       <Box display="flex" alignItems="center">

    //       </Box>
    //       {isOwnRecipe && (
    //         <Button variant="outlined" color="primary" onClick={handleEdit} sx={{ ml: 2 }}>
    //           Edit
    //         </Button>
    //       )}
    //     </Box>
    //   </Box>
    //   {isLabels && (
    //     <Stack sx={labelWrapperStyles} direction="row" spacing={1}>
    //       {labels.map(label => (
    //         <Chip
    //           component={RouterLink}
    //           to={`${ENonProtectedRoutes.RECIPES}/?label=${label.key}`}
    //           key={label.key}
    //           label={label.label}
    //           color="primary"
    //           variant="outlined"
    //           sx={{ cursor: 'pointer', marginTop: '8px !important' }}
    //         />
    //       ))}
    //     </Stack>
    //   )}
    //   <Typography sx={commonTypographyStyles} variant="subtitle1">
    //     {description}
    //   </Typography>
    //   <Typography sx={commonTypographyStyles} variant="body1">
    //     cooking time: {cookingTime} mins
    //   </Typography>
    //   <Typography sx={commonTypographyStyles} variant="body1">
    //     difficulty level: {difficultyLevel?.label}
    //   </Typography>
    //   <Typography sx={commonTypographyStyles} variant="body1">
    //     portions: {servings}
    //   </Typography>
    //   <Typography sx={commonTypographyStyles} variant="body1">
    //     created at: {formattedCreatedAt}
    //   </Typography>
    //   {isOwnRecipe && (
    //     <Typography sx={commonTypographyStyles} variant="body1">
    //       updated at: {formattedUpdatedAt}
    //     </Typography>
    //   )}

    //   {ingredients && ingredients.length > 0 && <IngredientList ingredients={ingredients} title="Ingredients" />}

    //   {orderedPreparationSteps && orderedPreparationSteps.length > 0 && (
    //     <PreparationStepList preparationSteps={orderedPreparationSteps} title="Cooking instructions" />
    //   )}
    //   {youtubeLink ? <YoutubeEmbed youtubeLink={youtubeLink} /> : null}
    // </WrapperContainer>
    <Container size="xl" id="recipe-detail-page">
      <h1>recipe details page</h1>
    </Container>
  );
};

export default RecipeDetailsPage;
