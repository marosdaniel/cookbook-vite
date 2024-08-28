import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Box, Button, Center, Container, Group, Stepper, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useAppDispatch } from '../../../store/hooks';
import { recipeFormValidationSchema } from '../../../utils/validation';
import { useRecipeState } from '../../../store/Recipe';
import { setCompletedSteps, setEditRecipe } from '../../../store/Recipe/recipe';
import { TNewRecipe, TRecipe } from '../../../store/Recipe/types';
import { ENonProtectedRoutes } from '../../../router/types';
import { CREATE_RECIPE, EDIT_RECIPE } from '../../../graphql/recipe/createRecipe';

import PreparationStepsEditor from './PreparationStepsEditor';
import IngredientsEditor from './IngredientsEditor';
import GeneralsEditor from './GeneralsEditor';
import { cleanLabels, nextEnabled, resetFormFields, useGetLabels } from './utils';
import { IFormikProps, IProps } from './types';

const RecipeFormEditor = ({ title, id, isEditMode, setIsEditMode }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState<number>(0);
  const nextStep = () => setActive(current => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));
  const isFinalStep = active === 2;

  const labels = useGetLabels();

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
    onError: error => {
      notifications.show({
        title: 'Recipe not created',
        message: error.message,
        color: 'red',
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
    editableRecipe: { recipe, completedSteps },
  } = useRecipeState();

  const onSubmit = async () => {
    if (!values.difficultyLevel || !values.category) {
      notifications.show({
        title: 'Please select difficulty level and category',
        message: 'You have to select difficulty level and category to proceed',
        color: 'red',
      });
      return;
    }

    const selectedLabels = values.labels
      .map(selectedLabel => {
        return cleanLabels(labels).find(label => label.key === selectedLabel.label);
      })
      .filter(label => label !== undefined);

    const id = recipe?._id;

    const recipeInput: TRecipe | TNewRecipe = {
      ...values,
      difficultyLevel: values.difficultyLevel,
      category: values.category,
      labels: selectedLabels,
    };

    try {
      let recipeId = id;

      if (!isEditMode) {
        const { data } = await createRecipe({
          variables: {
            recipeCreateInput: recipeInput,
          },
        });
        recipeId = data?.createRecipe._id;
      } else {
        await editRecipe({
          variables: {
            editRecipeId: id,
            recipeEditInput: recipeInput,
          },
        });
      }

      setIsEditMode?.(false);
      if (recipeId) {
        navigate(`${ENonProtectedRoutes.RECIPES}/${recipeId}`);
      } else {
        navigate(ENonProtectedRoutes.RECIPES);
      }
    } catch (_error) {
      console.log((_error as Error).message);
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
    console.log('handleFormChange');
  };

  const handleNext = () => {
    if (isFinalStep) {
      onSubmit();
      return;
    }
    dispatch(
      setEditRecipe({
        _id: recipe?._id,
        ...values,
      } as TRecipe),
    );
    dispatch(setCompletedSteps(active));
    nextStep();
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

  console.log(values);

  return (
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
          <Stepper.Step label="Ingredients" description="Add ingredients" disabled={!completedSteps.includes(0)}>
            <IngredientsEditor
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              setFieldValue={setFieldValue}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Instructions & save"
            description="Add instructions & save"
            disabled={!(completedSteps.includes(0) && completedSteps.includes(1))}
          >
            <PreparationStepsEditor values={values} setFieldValue={setFieldValue} />
          </Stepper.Step>
          <Stepper.Completed>
            <Center h={384}>You successfully created a recipe</Center>
          </Stepper.Completed>
        </Stepper>
      </Box>

      <Group justify="flex-end" mt="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>
        <Button
          type={isFinalStep ? 'submit' : 'button'}
          onClick={handleNext}
          loading={isSubmitting}
          disabled={!nextEnabled(values, active)}
        >
          {isFinalStep ? 'Save' : 'Next'}
        </Button>
      </Group>
    </Container>
  );
};

export default RecipeFormEditor;
