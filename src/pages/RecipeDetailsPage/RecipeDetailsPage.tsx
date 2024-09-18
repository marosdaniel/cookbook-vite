import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';
import {
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
  Grid,
  ActionIcon,
  Menu,
  Flex,
} from '@mantine/core';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { GET_RECIPE_BY_ID } from '../../graphql/recipe/getRecipes';
import { TRecipe, TRecipeCleaned } from '../../store/Recipe/types';
import { useAuthState } from '../../store/Auth';
import { setEditRecipe } from '../../store/Recipe/recipe';
import { ENonProtectedRoutes } from '../../router/types';
import RecipeFormEditor from '../../components/Recipe/RecipeFormEditor';
import { generalMessages, miscMessages } from '../../messages';

import PreparationStepList from './PreparationStepList';
import IngredientList from './IngredientList';
import Labels from './Labels';
import SideDetails from './SideDetails';
import AuthorSection from './AuthorSection';
import { IRecipeDetailsData } from './types';
import { cleanedRecipe } from '../../components/Recipe/RecipeFormEditor/utils';
import { MiscMessages } from '../../providers/IntlProviderContainer/types';

const RecipeDetailsPage = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { id } = useParams<{ id: string }>();

  const { user } = useAuthState();
  const { loading, error, data } = useQuery<IRecipeDetailsData>(GET_RECIPE_BY_ID, {
    variables: { id },
    fetchPolicy: 'cache-first',
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const rawRecipe: TRecipe | undefined = data?.getRecipeById;
  if (!rawRecipe) return null;
  const recipe: TRecipeCleaned | undefined = cleanedRecipe(rawRecipe);

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
  const isOwnRecipe = createdBy === user?.userName;
  // const formattedCreatedAt = new Date(createdAt || Date.now())?.toLocaleDateString();
  // const formattedUpdatedAt = new Date(updatedAt || Date.now())?.toLocaleDateString();

  const handleEdit = () => {
    if (recipe?.title) {
      // itt elég lenne csak editMode= true és RecipeFormEditornak át lehetne adni a recipet
      dispatch(setEditRecipe(recipe));
      setIsEditMode(true);
    }
  };

  const linkToCreator = (
    <Anchor c="teal.5" component={RouterLink} to={`${ENonProtectedRoutes.USERS}/${createdBy}`}>
      {createdBy}
    </Anchor>
  );

  const categoryLink = (
    <Anchor c="teal.5" component={RouterLink} to={`${ENonProtectedRoutes.RECIPES}/?category=${category?.value}`}>
      {formatMessage((miscMessages as MiscMessages)[category!.value])}
    </Anchor>
  );

  const orderedPreparationSteps =
    preparationSteps && preparationSteps.length > 0
      ? preparationSteps?.filter(step => typeof step.order === 'number').sort((a, b) => a.order - b.order)
      : [];

  if (isEditMode) {
    return (
      <RecipeFormEditor
        isEditMode
        setIsEditMode={setIsEditMode}
        title="Your Recipe Your Rules: Time to Edit"
        id="edit-recipe-page"
      />
    );
  }

  if (loading) return <LoadingOverlay visible={loading} />;

  return (
    <Container id="recipe-detail-page" size="md">
      <Flex mb={80} justify="space-between">
        <Title id="recipe-title" order={1} mb="lg" c="gray.7">
          {title}
        </Title>
        {isOwnRecipe ? (
          <Group>
            <Menu withArrow>
              <Menu.Target>
                <ActionIcon size="lg" variant="subtle">
                  <BsThreeDotsVertical size={28} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<MdOutlineModeEdit size={16} />} onClick={handleEdit}>
                  {formatMessage(generalMessages.edit)}
                </Menu.Item>
                <Menu.Item leftSection={<MdDeleteOutline size={16} />} color="red">
                  {formatMessage(generalMessages.delete)}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        ) : null}
      </Flex>

      {!!error?.message && (
        <Center h="384px">
          <Alert mt="md" color="red">
            {error?.message ?? 'An error occurred while fetching recipes'}
          </Alert>
        </Center>
      )}
      <Grid justify="space-between" columns={24} grow gutter="xxs">
        <Grid.Col
          span={{
            base: 24,
            md: 16,
            lg: 17,
          }}
        >
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
        </Grid.Col>
        {createdBy ? (
          <Grid.Col
            span={{
              base: 24,
              md: 8,
              lg: 5,
            }}
          >
            <AuthorSection author={createdBy} isOwnRecipe={isOwnRecipe} />
          </Grid.Col>
        ) : null}
      </Grid>
    </Container>
  );
};

export default RecipeDetailsPage;
