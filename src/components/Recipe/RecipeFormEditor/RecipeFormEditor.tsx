import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../../store/hooks';
import { recipeFormValidationSchema } from '../../../utils/validation';
import { newRecipe, resetEditRecipe, resetNewRecipe, setEditRecipe } from '../../../store/Recipe/recipe';
import { useRecipeState } from '../../../store/Recipe';
import { TIngredient, TPreparationStep } from '../../../store/Recipe/types';
import { ENonProtectedRoutes } from '../../../router/types';
import { CREATE_RECIPE, EDIT_RECIPE } from '../../../service/graphql/recipe/createRecipe';

import ErrorMessage from '../../ErrorMessage';
import LoadingBar from '../../LoadingBar';
import PageTitle from '../../stylingComponents/PageTitle';
import WrapperContainer from '../../stylingComponents/WrapperContainer';

import PreparationStepsEditor from './PreparationStepsEditor';
import IngredientsEditor from './IngredientsEditor';
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
import { buttonStyles, buttonWrapperStyles, gridContainerStyles, menuProps, resetButtonStyles } from './styles';
import { IFormikProps, IProps } from './types';

const RecipeFormEditor = ({ isEditMode, setIsEditMode }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [createRecipe, { loading: createRecipeLoading, error: createRecipeError }] = useMutation(CREATE_RECIPE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          getRecipes(existingRecipes = []) {
            return [...existingRecipes, data?.createRecipe];
          },
        },
      });
    },
  });
  const [editRecipe, { loading: editRecipeLoading, error: editRecipeError }] = useMutation(EDIT_RECIPE, {
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
  });

  const { newRecipe: newRecipeFromStore, editRecipe: editRecipeFromStore } = useRecipeState();

  const metaDifficultyLevels = useGetDifficultyLevels();
  const metaCategories = useGetCategories();
  const metaLabels = useGetLabels();

  const initialIngredients = getInitialIngredients(isEditMode || false, newRecipeFromStore, editRecipeFromStore);
  const initialPreparationSteps = getInitialPreparationSteps(
    isEditMode || false,
    newRecipeFromStore,
    editRecipeFromStore,
  );

  const [ingredients, setIngredients] = useState<TIngredient[]>(initialIngredients);
  const [preparationSteps, setPreparationSteps] = useState<TPreparationStep[]>(initialPreparationSteps);

  const onSubmit = async () => {
    const inputValues = isEditMode ? editRecipeFromStore : newRecipeFromStore;

    const recipeInput = {
      title: inputValues?.title,
      description: inputValues?.description,
      imgSrc: inputValues?.imgSrc,
      cookingTime: inputValues?.cookingTime,
      difficultyLevel: cleanDifficultyLevel(inputValues?.difficultyLevel),
      category: cleanCategory(inputValues?.category),
      labels: cleanLabels(inputValues?.labels || []),
      ingredients: cleanIngredients(ingredients),
      preparationSteps: cleanPreparationSteps(preparationSteps),
      servings: inputValues?.servings || 1,
      youtubeLink: inputValues?.youtubeLink,
    };

    try {
      if (!isEditMode) {
        await createRecipe({
          variables: {
            recipeCreateInput: recipeInput,
          },
        }).then(() => {
          // dispatch a success message for the snack bar
        });
      } else {
        await editRecipe({
          variables: {
            editRecipeId: editRecipeFromStore?._id,
            recipeEditInput: recipeInput,
          },
        }).then(() => {
          // dispatch a success message for the snack bar
        });
      }
      const id = isEditMode ? editRecipeFromStore?._id : newRecipeFromStore?._id;
      setIsEditMode?.(false);
      dispatch(resetNewRecipe());
      dispatch(resetEditRecipe());
      navigate(`${ENonProtectedRoutes.RECIPES}/${id}`);
    } catch (_error) {
      console.log((_error as Error).message);
      // dispatch an error message for the snack bar
    }
  };

  const initialValues = getInitialValues(isEditMode, newRecipeFromStore, editRecipeFromStore);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched, isSubmitting } = useFormik<IFormikProps>({
    initialValues,
    onSubmit,
    validationSchema: recipeFormValidationSchema,
  });

  const [debouncedValues, setDebouncedValues] = useState<IFormikProps | undefined>(values);
  const handleFormChange = () => {
    if (!debouncedValues?.title) return;
    const { title, description, imgSrc, cookingTime, difficultyLevel, category, labels, servings, youtubeLink } =
      debouncedValues;
    if (!isEditMode) {
      dispatch(
        newRecipe({
          ...newRecipeFromStore,
          title,
          description,
          imgSrc,
          cookingTime,
          difficultyLevel,
          category,
          labels,
          servings,
          youtubeLink,
        }),
      );
    } else if (difficultyLevel !== undefined && category !== undefined && editRecipeFromStore?._id !== undefined) {
      dispatch(
        setEditRecipe({
          ...editRecipeFromStore,
          title,
          description,
          imgSrc,
          cookingTime,
          difficultyLevel,
          category,
          labels,
          servings,
          youtubeLink,
        }),
      );
    }
  };

  const handleOnReset = () => {
    if (isEditMode) {
      dispatch(resetEditRecipe());
      setIsEditMode?.(false);
    } else {
      dispatch(resetNewRecipe());
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

  if (createRecipeLoading || editRecipeLoading) {
    return <LoadingBar />;
  }

  if (createRecipeError || editRecipeError) {
    return <ErrorMessage />;
  }

  return (
    <WrapperContainer id="edit-recipe-page">
      <PageTitle title={isEditMode ? 'Your Recipe Your Rules: Time to Edit' : 'Start Crafting'} />
      <Grid component="form" container sx={gridContainerStyles} onSubmit={handleSubmit} onChange={handleFormChange}>
        <Grid item xs={12} sm={12} md={6} lg={8} marginBottom={8}>
          <Typography variant="h6" marginBottom={2} fontStyle={'italic'}>
            Please fill in the form below to create a new recipe
          </Typography>
          <TextField
            value={values.title}
            error={Boolean(errors.title && touched.title)}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            variant="standard"
          />
          <TextField
            value={values.description}
            error={Boolean(errors.description && touched.description)}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            variant="standard"
            helperText='Short description of the recipe, e.g. "This is a great recipe for a quick and easy pizza sauce."'
          />
          <TextField
            value={values.imgSrc}
            error={Boolean(errors.imgSrc && touched.imgSrc)}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            fullWidth
            id="imgSrc"
            label="Image URL"
            name="imgSrc"
            autoComplete="image-url"
            variant="standard"
          />
          <TextField
            sx={{ display: 'flex', width: '240px' }}
            value={values.servings}
            error={Boolean(errors.servings && touched.servings)}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            required
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="start">portion</InputAdornment>,
              inputProps: {
                type: 'number',
                min: 0,
                max: 99,
                step: 1,
                style: { textAlign: 'right', marginRight: '8px' },
              },
            }}
            id="servings"
            label="Servings"
            name="servings"
            variant="standard"
            helperText="Specify the number of servings or portions for this recipe"
          />
          <TextField
            sx={{ display: 'flex', width: '240px' }}
            value={values.cookingTime}
            error={Boolean(errors.cookingTime && touched.cookingTime)}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            required
            type="number"
            id="cookingTime"
            label="Cooking time"
            name="cookingTime"
            autoComplete="cooking-time"
            InputProps={{
              endAdornment: <InputAdornment position="start">min</InputAdornment>,
              inputProps: {
                type: 'number',
                min: 0,
                max: 999,
                step: 1,
                style: { textAlign: 'right', marginRight: '8px' },
              },
            }}
            variant="standard"
            helperText="Please enter cooking time in minutes"
          />
          <Grid item xs={12} sx={{ mt: '16px', mb: '8px' }}>
            <TextField
              value={values.difficultyLevel?.label || ''}
              error={Boolean(errors.difficultyLevel && touched.difficultyLevel)}
              onChange={event => {
                const selectedDifficulty = metaDifficultyLevels.find(option => option.label === event.target.value);
                handleChange({
                  target: {
                    name: 'difficultyLevel',
                    value: selectedDifficulty,
                  },
                });
              }}
              onBlur={handleBlur}
              id="difficultyLevel"
              name="difficultyLevel"
              select
              required
              label="Difficulty level"
              helperText="Please select level of difficulty"
              variant="standard"
              defaultValue=""
              disabled={!metaDifficultyLevels.length}
              InputProps={{ style: { width: '240px' } }}
            >
              {metaDifficultyLevels.map(option => (
                <MenuItem key={option.key} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: '16px', mb: '8px' }}>
            <TextField
              value={values.category?.label || ''}
              error={Boolean(errors.category && touched.category)}
              onChange={event => {
                const selectedCategory = metaCategories.find(option => option.label === event.target.value);
                handleChange({
                  target: {
                    name: 'category',
                    value: selectedCategory,
                  },
                });
              }}
              onBlur={handleBlur}
              id="category"
              name="category"
              select
              required
              label="Category"
              helperText="Please select a category"
              variant="standard"
              disabled={!metaCategories.length}
              InputProps={{ style: { width: '240px' } }}
            >
              {metaCategories.map(option => (
                <MenuItem key={option.key} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid component={FormControl} item xs={12} sx={{ mt: '16px', mb: '8px' }}>
            <InputLabel id="multiple-chip-label">Labels</InputLabel>
            <Select
              sx={{ minWidth: '100px' }}
              labelId="test-select-label"
              label="Label"
              id="label-label-id"
              multiple
              value={values.labels.map(label => label.key)}
              onChange={event => {
                const selectedLabelKeys = event.target.value as string[];
                const selectedLabels = metaLabels.filter(label => selectedLabelKeys.includes(label.key));
                handleChange({
                  target: {
                    name: 'labels',
                    value: selectedLabels,
                  },
                });
              }}
              input={<OutlinedInput id="select-multiple-chip" label="Labels" />}
              renderValue={(selected: string[]) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => {
                    const selectedLabel = metaLabels.find(label => label.key === value);
                    return <Chip key={selectedLabel?.key} label={selectedLabel?.label} />;
                  })}
                </Box>
              )}
              MenuProps={menuProps}
            >
              {metaLabels.map(label => (
                <MenuItem key={label.key} value={label.key}>
                  {label.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <IngredientsEditor ingredients={ingredients} setIngredients={setIngredients} isEditMode={isEditMode} />
        <PreparationStepsEditor
          preparationSteps={preparationSteps}
          setPreparationSteps={setPreparationSteps}
          isEditMode={isEditMode}
        />
        <Grid item xs={12} sm={12} md={6} lg={8} sx={buttonWrapperStyles}>
          <Button
            color={isEditMode ? 'info' : 'error'}
            variant="contained"
            type="reset"
            disabled={isSubmitting || createRecipeLoading || editRecipeLoading}
            sx={resetButtonStyles}
            onClick={handleOnReset}
          >
            {isEditMode ? 'Back' : 'Reset'}
          </Button>

          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting || createRecipeLoading || editRecipeLoading}
            sx={buttonStyles}
          >
            {isEditMode ? 'Save' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </WrapperContainer>
  );
};

export default RecipeFormEditor;
