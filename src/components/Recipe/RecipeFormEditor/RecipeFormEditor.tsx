import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Box, Button, Container, Group, Stepper, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useAppDispatch } from '../../../store/hooks';
import { recipeFormValidationSchema } from '../../../utils/validation';
import { useRecipeState } from '../../../store/Recipe';
import { TIngredient, TPreparationStep } from '../../../store/Recipe/types';
import { ENonProtectedRoutes } from '../../../router/types';
import { CREATE_RECIPE, EDIT_RECIPE } from '../../../graphql/recipe/createRecipe';

import PreparationStepsEditor from './PreparationStepsEditor';
import IngredientsEditor from './IngredientsEditor';
import GeneralsEditor from './GeneralsEditor';
import {
  cleanCategory,
  cleanDifficultyLevel,
  cleanIngredients,
  cleanLabels,
  cleanPreparationSteps,
  getInitialIngredients,
  getInitialPreparationSteps,
  getInitialValues,
  resetFormFields,
  useGetCategories,
  useGetDifficultyLevels,
  useGetLabels,
} from './utils';
import { IFormikProps, IProps } from './types';

const RecipeFormEditor = ({ title, id, isEditMode, setIsEditMode }: IProps) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const nextStep = () => setActive(current => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));
  const isFinalStep = active === 2;

  // const dispatch = useAppDispatch();

  const [createRecipe] = useMutation(CREATE_RECIPE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          getRecipes(existingRecipes = []) {
            return [...existingRecipes, data?.createRecipe];
          },
        },
      });
    },
    onCompleted: () => {
      notifications.show({
        title: 'Recipe created',
        message: 'Your recipe has been successfully created',
        color: 'green',
      });
    },
  });
  const [editRecipe] = useMutation(EDIT_RECIPE, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify(data?.editRecipe),
        fields: {
          getRecipeById(existingRecipeRef = {}) {
            return { ...existingRecipeRef, ...data?.editRecipe };
          },
        },
      });
    },
    onCompleted: () => {
      notifications.show({
        title: 'Recipe updated',
        message: 'Your recipe has been successfully updated',
        color: 'green',
      });
    },
  });

  const {
    editableRecipe: { recipe: recipe, completedSteps },
  } = useRecipeState();

  const metaDifficultyLevels = useGetDifficultyLevels();
  const metaCategories = useGetCategories();
  const metaLabels = useGetLabels();

  // const initialIngredients = getInitialIngredients(isEditMode || false, newRecipeFromStore, editRecipeFromStore);
  // const initialPreparationSteps = getInitialPreparationSteps(
  //   isEditMode || false,
  //   newRecipeFromStore,
  //   editRecipeFromStore,
  // );

  // const [ingredients, setIngredients] = useState<TIngredient[]>(initialIngredients);
  // const [preparationSteps, setPreparationSteps] = useState<TPreparationStep[]>(initialPreparationSteps);

  const onSubmit = async () => {
    const inputValues = recipe;
    const id = recipe?._id;

    const recipeInput = {
      title: inputValues?.title,
      description: inputValues?.description,
      imgSrc: inputValues?.imgSrc,
      cookingTime: inputValues?.cookingTime,
      difficultyLevel: cleanDifficultyLevel(inputValues?.difficultyLevel),
      category: cleanCategory(inputValues?.category),
      labels: cleanLabels(inputValues?.labels || []),
      ingredients: cleanIngredients(inputValues?.ingredients || []),
      preparationSteps: cleanPreparationSteps(inputValues?.preparationSteps || []),
      servings: inputValues?.servings || 1,
      youtubeLink: inputValues?.youtubeLink,
    };

    try {
      if (!isEditMode) {
        await createRecipe({
          variables: {
            recipeCreateInput: recipeInput,
          },
        });
      } else {
        await editRecipe({
          variables: {
            editRecipeId: id,
            recipeEditInput: recipeInput,
          },
        });
      }

      setIsEditMode?.(false);
      // dispatch(resetNewRecipe());
      // dispatch(resetEditRecipe());
      navigate(`${ENonProtectedRoutes.RECIPES}/${id}`);
    } catch (_error) {
      console.log((_error as Error).message);
      // dispatch an error message for the snack bar
    }
  };

  const initialValues = {
    title: recipe?.title || '',
    description: recipe?.description || '',
    imgSrc: recipe?.imgSrc || '',
    servings: recipe?.servings || 1,
    cookingTime: recipe?.cookingTime || 0,
    difficultyLevel: recipe?.difficultyLevel || undefined,
    category: recipe?.category || undefined,
    labels: recipe?.labels || [],
    youtubeLink: recipe?.youtubeLink || '',
    ingredients: recipe?.ingredients || [],
    preparationSteps: recipe?.preparationSteps || [],
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched, isSubmitting, setFieldValue } =
    useFormik<IFormikProps>({
      initialValues,
      onSubmit,
      validationSchema: recipeFormValidationSchema,
    });

  const [debouncedValues, setDebouncedValues] = useState<IFormikProps | undefined>(values);
  const handleFormChange = () => {
    if (!debouncedValues?.title) return;
    // const { title, description, imgSrc, cookingTime, difficultyLevel, category, labels, servings, youtubeLink } =
    //   debouncedValues;
    // if (!isEditMode) {
    //   dispatch(
    //     newRecipe({
    //       ...newRecipeFromStore,
    //       title,
    //       description,
    //       imgSrc,
    //       cookingTime,
    //       difficultyLevel,
    //       category,
    //       labels,
    //       servings,
    //       youtubeLink,
    //     }),
    //   );
    // } else if (difficultyLevel !== undefined && category !== undefined && editRecipeFromStore?._id !== undefined) {
    //   dispatch(
    //     setEditRecipe({
    //       ...editRecipeFromStore,
    //       title,
    //       description,
    //       imgSrc,
    //       cookingTime,
    //       difficultyLevel,
    //       category,
    //       labels,
    //       servings,
    //       youtubeLink,
    //     }),
    //   );
    // }
  };

  const handleOnReset = () => {
    if (isEditMode) {
      // dispatch(resetEditRecipe());
      setIsEditMode?.(false);
    } else {
      // dispatch(resetNewRecipe());
    }
    resetFormFields(values);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues(values);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [values]);

  useEffect(() => {
    handleFormChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues]);

  // if (createRecipeLoading || editRecipeLoading) {
  //   return <LoadingBar />;
  // }

  // if (createRecipeError || editRecipeError) {
  //   return <ErrorMessage />;
  // }

  return (
    // <WrapperContainer id="edit-recipe-page">
    //   <PageTitle title={isEditMode ? 'Your Recipe Your Rules: Time to Edit' : 'Start Crafting'} />
    //   <Grid component="form" container sx={gridContainerStyles} onSubmit={handleSubmit} onChange={handleFormChange}>
    //     <Grid item xs={12} sm={12} md={6} lg={8} marginBottom={8}>
    //       <Typography variant="h6" marginBottom={2} fontStyle={'italic'}>
    //         Please fill in the form below to create a new recipe
    //       </Typography>

    //       <Grid item xs={12} sx={{ mt: '16px', mb: '8px' }}>
    //         <TextField
    //           value={values.difficultyLevel?.label || ''}
    //           error={Boolean(errors.difficultyLevel && touched.difficultyLevel)}
    //           onChange={event => {
    //             const selectedDifficulty = metaDifficultyLevels.find(option => option.label === event.target.value);
    //             handleChange({
    //               target: {
    //                 name: 'difficultyLevel',
    //                 value: selectedDifficulty,
    //               },
    //             });
    //           }}
    //           onBlur={handleBlur}
    //           id="difficultyLevel"
    //           name="difficultyLevel"
    //           select
    //           required
    //           label="Difficulty level"
    //           helperText="Please select level of difficulty"
    //           variant="standard"
    //           defaultValue=""
    //           disabled={!metaDifficultyLevels.length}
    //           InputProps={{ style: { width: '240px' } }}
    //         >
    //           {metaDifficultyLevels.map(option => (
    //             <MenuItem key={option.key} value={option.label}>
    //               {option.label}
    //             </MenuItem>
    //           ))}
    //         </TextField>
    //       </Grid>
    //       <Grid item xs={12} sx={{ mt: '16px', mb: '8px' }}>
    //         <TextField
    //           value={values.category?.label || ''}
    //           error={Boolean(errors.category && touched.category)}
    //           onChange={event => {
    //             const selectedCategory = metaCategories.find(option => option.label === event.target.value);
    //             handleChange({
    //               target: {
    //                 name: 'category',
    //                 value: selectedCategory,
    //               },
    //             });
    //           }}
    //           onBlur={handleBlur}
    //           id="category"
    //           name="category"
    //           select
    //           required
    //           label="Category"
    //           helperText="Please select a category"
    //           variant="standard"
    //           disabled={!metaCategories.length}
    //           InputProps={{ style: { width: '240px' } }}
    //         >
    //           {metaCategories.map(option => (
    //             <MenuItem key={option.key} value={option.label}>
    //               {option.label}
    //             </MenuItem>
    //           ))}
    //         </TextField>
    //       </Grid>
    //     <IngredientsEditor ingredients={ingredients} setIngredients={setIngredients} isEditMode={isEditMode} />
    //     <PreparationStepsEditor
    //       preparationSteps={preparationSteps}
    //       setPreparationSteps={setPreparationSteps}
    //       isEditMode={isEditMode}
    //     />
    //     <Grid item xs={12} sm={12} md={6} lg={8} sx={buttonWrapperStyles}>
    //       <Button
    //         color={isEditMode ? 'info' : 'error'}
    //         variant="contained"
    //         type="reset"
    //         disabled={isSubmitting || createRecipeLoading || editRecipeLoading}
    //         sx={resetButtonStyles}
    //         onClick={handleOnReset}
    //       >
    //         {isEditMode ? 'Back' : 'Reset'}
    //       </Button>

    //       <Button
    //         variant="contained"
    //         type="submit"
    //         disabled={isSubmitting || createRecipeLoading || editRecipeLoading}
    //         sx={buttonStyles}
    //       >
    //         {isEditMode ? 'Save' : 'Create'}
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </WrapperContainer>

    <Container size="md" id={id}>
      <Title order={2} mb="xl">
        {title}
      </Title>
      <Box component="form" onSubmit={handleSubmit}>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Generals" description="General info">
            <GeneralsEditor
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
            />
          </Stepper.Step>
          <Stepper.Step label="Ingredtiens" description="Add ingredients" disabled={!completedSteps.includes(0)}>
            {/* <IngredientsEditor ingredients={ingredients} setIngredients={setIngredients} isEditMode={isEditMode} /> */}
            INGREDIENTS
          </Stepper.Step>
          <Stepper.Step
            label="Instructions & save"
            description="Add instructions & save"
            disabled={!completedSteps.includes(0, 1)}
          >
            COOKING INSTRUCTIONS
          </Stepper.Step>
          {/* <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed> */}
        </Stepper>
      </Box>

      <Group justify="flex-end" mt="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>
        <Button type={isFinalStep ? 'submit' : 'button'} onClick={nextStep} loading={isSubmitting}>
          {isFinalStep ? 'Save' : 'Next'}
        </Button>
      </Group>
    </Container>
  );
};

export default RecipeFormEditor;
