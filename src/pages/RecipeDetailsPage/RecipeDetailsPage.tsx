import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Button,
  Container,
  Title,
  Image,
  AspectRatio,
  rem,
  Text,
  Anchor,
  LoadingOverlay,
  Alert,
  Center,
} from '@mantine/core';
import { IoArrowBackOutline } from 'react-icons/io5';

import { GET_RECIPE_BY_ID } from '../../graphql/recipe/getRecipes';
import { useAppDispatch } from '../../store/hooks';
import { setEditRecipe } from '../../store/Recipe/recipe';
import { TRecipe } from '../../store/Recipe/types';
import { useAuthState } from '../../store/Auth';
import { ENonProtectedRoutes } from '../../router/types';

import PreparationStepList from './PreparationStepList';
import IngredientList from './IngredientList';
import { IRecipeDetailsData } from './types';

const RecipeDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { user } = useAuthState();
  const { loading, error, data } = useQuery<IRecipeDetailsData>(GET_RECIPE_BY_ID, {
    variables: { id } as { id: string },
    fetchPolicy: 'cache-and-network',
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

  const linkToCreator = (
    <Anchor variant="gradient" component={RouterLink} to={`${ENonProtectedRoutes.USERS}/${createdBy}`}>
      {createdBy}
    </Anchor>
  );

  const categoryLink = (
    <Anchor variant="gradient" component={RouterLink} to={`${ENonProtectedRoutes.RECIPES}/?category=${category?.key}`}>
      {category?.label}
    </Anchor>
  );

  const orderedPreparationSteps =
    preparationSteps && preparationSteps.length > 0
      ? preparationSteps?.filter(step => typeof step.order === 'number').sort((a, b) => a.order - b.order)
      : [];

  if (isEditMode) {
    // return <RecipeFormEditor isEditMode setIsEditMode={setIsEditMode} />;
  }

  if (loading) return <LoadingOverlay visible={loading} />;

  return (
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

    //   {youtubeLink ? <YoutubeEmbed youtubeLink={youtubeLink} /> : null}
    // </WrapperContainer>
    <Container size="md" id="recipe-detail-page">
      <Button
        to={ENonProtectedRoutes.RECIPES}
        component={RouterLink}
        leftSection={<IoArrowBackOutline size={20} />}
        variant="transparent"
        size="md"
        mb={{
          xs: 'lg',
          sm: 'lg',
        }}
      >
        Back
      </Button>
      {error?.message && (
        <Center h="384px">
          <Alert mt="md" color="red">
            {error?.message ?? 'An error occurred while fetching recipes'}
          </Alert>
        </Center>
      )}
      <AspectRatio ratio={16 / 9} style={{ flex: `0 0 ${rem(100)}` }} mb="xl">
        <Image
          alt={title}
          radius="md"
          h={'auto'}
          mah={'380px'}
          w="100%"
          fit="contain"
          src={imgSrc}
          fallbackSrc="https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg"
        />
      </AspectRatio>
      <Title order={2} mb="lg">
        {title}
      </Title>
      <Text fs="italic" variant="subtitle2">
        a {categoryLink} from {linkToCreator}'s kitchen
      </Text>

      {ingredients && ingredients.length && <IngredientList ingredients={ingredients} title="Ingredients" />}
      {orderedPreparationSteps && orderedPreparationSteps.length > 0 && (
        <PreparationStepList preparationSteps={orderedPreparationSteps} title="Cooking instructions" />
      )}
    </Container>
  );
};

export default RecipeDetailsPage;
