import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
import { generalMessages, miscMessages, seoMessages } from '../../messages';
import { MiscMessages } from '../../providers/IntlProviderContainer/types';
import RecipeFormEditor from '../../components/Recipe/RecipeFormEditor';
import { cleanedRecipe } from '../../components/Recipe/RecipeFormEditor/utils';
import HeroImageBackground from '../../components/HeroImageBackground';
import FavoriteToggler from '../../components/Recipe/FavoriteToggler';
import Seo from '../../components/Seo';
import PreparationStepList from './PreparationStepList';
import IngredientList from './IngredientList';
import Labels from './Labels';
import SideDetails from './SideDetails';
import AuthorSection from './AuthorSection';
import { IRecipeDetailsData } from './types';

const RecipeDetailsPage = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { id } = useParams<{ id: string }>();

  const { user } = useAuthState();
  const userId = user?._id;
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
    isFavorite,
  } = recipe || {};

  const isLabels = labels && labels?.length > 0;
  const isOwnRecipe = createdBy === user?.userName;
  // const formattedCreatedAt = new Date(createdAt || Date.now())?.toLocaleDateString();
  // const formattedUpdatedAt = new Date(updatedAt || Date.now())?.toLocaleDateString();

  const handleEdit = () => {
    if (recipe?.title) {
      dispatch(setEditRecipe(recipe));
      setIsEditMode(true);
    }
  };

  const linkToCreator = (
    <Anchor fw={700} td="underline" c="white" component={RouterLink} to={`${ENonProtectedRoutes.USERS}/${createdBy}`}>
      {createdBy}
    </Anchor>
  );

  const categoryLink = (
    <Anchor
      fw={700}
      td="underline"
      c="white"
      component={RouterLink}
      to={`${ENonProtectedRoutes.RECIPES}/?category=${category?.value}`}
    >
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

  if (loading || !recipe || !id || !createdBy)
    return (
      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
    );

  return (
    <>
      <Seo
        title={formatMessage(seoMessages.recipeDetailTitle, { title, createdBy })}
        description={formatMessage(seoMessages.recipeDetailDescription, {
          title,
          createdBy,
          category: category?.label || 'food',
          cookingTime,
        })}
        keywords={formatMessage(seoMessages.recipeDetailKeywords, {
          title,
          category: category?.label || 'food',
          createdBy,
        })}
        type="website"
        name="Cookbook"
        url={`https://cookbook-vite.vercel.app/recipes/${id}`}
        canonicalUrl={`https://cookbook-vite.vercel.app/recipes/${id}`}
        locale={user?.locale}
      />
      <HeroImageBackground>
        <Flex justify="space-between">
          <Flex direction="row" mt="xl" mb="lg" align="baseline">
            <Title id="recipe-title" order={1} c="white" size={'h1'} mr="sm">
              {title}
            </Title>
            {userId && (
              <FavoriteToggler
                userId={userId}
                id={id}
                initialIsFavorite={isFavorite}
                userName={createdBy}
                disableClick={false}
              />
            )}
          </Flex>

          {isOwnRecipe ? (
            <Group>
              <Menu withArrow>
                <Menu.Target>
                  <ActionIcon size="lg" variant="subtle">
                    <BsThreeDotsVertical size={32} color="white" />
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
        <Flex direction="column" mb={80}>
          <Text id="recipe-subtitle" fs="italic" variant="text" c="white">
            {categoryLink} from {linkToCreator}'s kitchen
          </Text>
          <Text c="white" id="recipe-description" fs="italic" mt="lg">
            {description}
          </Text>
        </Flex>
      </HeroImageBackground>
      <Container
        id="recipe-detail-page"
        size="md"
        mt={{
          base: '-10%',
          xs: '-12%',
          md: '-12%',
          lg: '-10%',
          xl: '-100px',
        }}
      >
        {!!error?.message && (
          <Center h="384px">
            <Alert mt="md" color="red">
              {error?.message ?? 'An error occurred while fetching recipes'}
            </Alert>
          </Center>
        )}
        <Grid justify="space-between" columns={24} grow gutter="lg">
          <Grid.Col
            style={{ zIndex: 1 }}
            span={{
              base: 24,
              md: 16,
              lg: 17,
            }}
          >
            <AspectRatio ratio={16 / 9} style={{ flex: `0 0 ${rem(100)}` }} mb="xl">
              <Image
                alt={title}
                h={'auto'}
                radius="lg"
                mah={'380px'}
                // fit="scale-down"
                src={imgSrc}
                fallbackSrc="https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg"
              />
            </AspectRatio>
            {isLabels && <Labels labels={labels} />}

            <SideDetails difficultyLevel={difficultyLevel!} servings={servings!} cookingTime={cookingTime!} />

            {ingredients && ingredients.length && <IngredientList ingredients={ingredients} title="Ingredients" />}
            {orderedPreparationSteps && orderedPreparationSteps.length > 0 && (
              <PreparationStepList preparationSteps={orderedPreparationSteps} title="Cooking instructions" />
            )}
          </Grid.Col>
          {createdBy ? (
            <Grid.Col
              style={{ zIndex: 1 }}
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
    </>
  );
};

export default RecipeDetailsPage;
