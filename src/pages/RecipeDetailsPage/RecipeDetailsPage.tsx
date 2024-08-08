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
  Group,
} from '@mantine/core';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdOutlineModeEdit } from 'react-icons/md';

import { GET_RECIPE_BY_ID } from '../../graphql/recipe/getRecipes';
import { TRecipe } from '../../store/Recipe/types';
import { useAuthState } from '../../store/Auth';
import { ENonProtectedRoutes } from '../../router/types';

import PreparationStepList from './PreparationStepList';
import IngredientList from './IngredientList';
import Labels from './Labels';
import SideDetails from './SideDetails';
import { IRecipeDetailsData } from './types';

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { user } = useAuthState();
  const { loading, error, data } = useQuery<IRecipeDetailsData>(GET_RECIPE_BY_ID, {
    variables: { id },
    fetchPolicy: 'cache-first',
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
    // updatedAt,
    category,
    cookingTime,
    // createdAt,
    difficultyLevel,
    labels,
    servings,
  } = recipe || {};

  const isLabels = labels && labels?.length > 0;
  const isOwnRecipe = data?.getRecipeById.createdBy === user?.userName;
  // const formattedCreatedAt = new Date(createdAt || Date.now())?.toLocaleDateString();
  // const formattedUpdatedAt = new Date(updatedAt || Date.now())?.toLocaleDateString();

  const handleEdit = () => {
    if (recipe?.title) {
      // itt elég lenne csak editMode= true és RecipeFormEditornak át lehetne adni a recipet
      // dispatch(setEditRecipe(recipe));
      setIsEditMode(true);
    }
  };

  const linkToCreator = (
    <Anchor c="teal.5" component={RouterLink} to={`${ENonProtectedRoutes.USERS}/${createdBy}`}>
      {createdBy}
    </Anchor>
  );

  const categoryLink = (
    <Anchor c="teal.5" component={RouterLink} to={`${ENonProtectedRoutes.RECIPES}/?category=${category?.key}`}>
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
    <Container
      size="md"
      id="recipe-detail-page"
      p={{
        base: 'xs',
        md: 'md',
      }}
    >
      <Group justify="space-between" mb="lg">
        <Button
          to={ENonProtectedRoutes.RECIPES}
          component={RouterLink}
          leftSection={<IoArrowBackOutline size={20} />}
          variant="transparent"
          size="md"
        >
          Back
        </Button>
        {isOwnRecipe && (
          <Button variant="subtle" size="md" onClick={handleEdit} leftSection={<MdOutlineModeEdit size={20} />}>
            Edit
          </Button>
        )}
      </Group>
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
      {isLabels && <Labels labels={labels} />}
      <Title id="recipe-title" order={1} mb="lg" ta="center">
        {title}
      </Title>
      <Text id="recipe-subtitle" fs="italic" variant="text" ta="center">
        {categoryLink} from {linkToCreator}'s kitchen
      </Text>
      <Text id="recipe-description" fs="italic" ta="center" mt="lg">
        {description}
      </Text>

      <SideDetails difficultyLevel={difficultyLevel!} servings={servings!} cookingTime={cookingTime!} />

      {ingredients && ingredients.length && <IngredientList ingredients={ingredients} title="Ingredients" />}
      {orderedPreparationSteps && orderedPreparationSteps.length > 0 && (
        <PreparationStepList preparationSteps={orderedPreparationSteps} title="Cooking instructions" />
      )}
    </Container>
  );
};

export default RecipeDetailsPage;
