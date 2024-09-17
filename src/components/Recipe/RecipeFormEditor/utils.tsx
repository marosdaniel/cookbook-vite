import { useQuery } from '@apollo/client';

import { TAllMetadata, TMetadataCleaned, TMetadataType, TUnitMetadata } from '../../../store/Metadata/types';
import { GET_METADATA_BY_TYPE } from '../../../graphql/metadata/getMetadata';
import { TIngredient, TPreparationStep, TRecipe } from '../../../store/Recipe/types';
import { IFormikProps, TRemoveTypeObject } from './types';

export const useGetUnits = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TUnitMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: TMetadataType.UNIT },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};

export const cleanMetadata = (metadata: TAllMetadata[]): TMetadataCleaned[] => {
  return metadata.map(item => ({
    value: item.key,
    label: item.name,
  }));
};

export const cleanSingleMetadata = (metadata: TAllMetadata): TMetadataCleaned => {
  return {
    value: metadata.key,
    label: metadata.name,
  };
};

export const cleanIngredients = (ingredients: TIngredient[] | undefined): TIngredient[] => {
  return (
    ingredients?.map(ingredient => ({
      localId: ingredient.localId,
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    })) || []
  );
};

export const cleanPreparationSteps = (preparationSteps: TPreparationStep[] | undefined): TPreparationStep[] => {
  return (
    preparationSteps?.map(step => ({
      description: step.description,
      order: step.order,
    })) || []
  );
};

export const getInitialValues = (
  isEditMode: boolean | undefined,
  newRecipeFromStore: TRecipe | undefined,
  editRecipeFromStore: TRecipe | undefined,
) => {
  const newIngredient = { localId: '1', name: '', quantity: 1, unit: '' };
  const newPreparationStep = { description: '', order: 1 };

  const initialIngredients = isEditMode
    ? editRecipeFromStore?.ingredients || []
    : newRecipeFromStore?.ingredients?.length
      ? [...newRecipeFromStore.ingredients]
      : [newIngredient];

  const initialPreparationSteps = isEditMode
    ? editRecipeFromStore?.preparationSteps || []
    : newRecipeFromStore?.preparationSteps?.length
      ? [...newRecipeFromStore.preparationSteps]
      : [newPreparationStep];

  return {
    title: isEditMode ? editRecipeFromStore?.title || '' : newRecipeFromStore?.title || '',
    description: isEditMode ? editRecipeFromStore?.description || '' : newRecipeFromStore?.description || '',
    imgSrc: isEditMode ? editRecipeFromStore?.imgSrc || '' : newRecipeFromStore?.imgSrc || '',
    cookingTime: isEditMode ? editRecipeFromStore?.cookingTime || 0 : newRecipeFromStore?.cookingTime || 0,
    difficultyLevel: isEditMode
      ? editRecipeFromStore?.difficultyLevel
      : newRecipeFromStore?.difficultyLevel || undefined,
    category: isEditMode ? editRecipeFromStore?.category : newRecipeFromStore?.category || undefined,
    labels: isEditMode ? editRecipeFromStore?.labels || [] : newRecipeFromStore?.labels || [],
    ingredients: initialIngredients,
    preparationSteps: initialPreparationSteps,
    servings: isEditMode ? editRecipeFromStore?.servings || 1 : newRecipeFromStore?.servings || 1,
  };
};

export const resetFormFields = (values: IFormikProps) => {
  values.title = '';
  values.description = '';
  values.imgSrc = '';
  values.servings = 1;
  values.cookingTime = 0;
  values.difficultyLevel = null;
  values.category = null;
  values.labels = [];
  values.ingredients = [];
  values.preparationSteps = [];
};

export const getInitialIngredients = (
  isEditMode: boolean,
  newRecipeFromStore: TRecipe | undefined,
  editRecipeFromStore: TRecipe | undefined,
): TIngredient[] => {
  const newIngredients = newRecipeFromStore?.ingredients || [];
  const editIngredients = editRecipeFromStore?.ingredients || [];
  const newIngredient = { localId: '1', name: '', quantity: 1, unit: '' };

  let ingredients: TIngredient[];

  if (isEditMode) {
    ingredients = editIngredients;
  } else {
    ingredients = newIngredients?.length ? [...newIngredients] : [newIngredient];
  }

  return ingredients;
};

export const getInitialPreparationSteps = (
  isEditMode: boolean,
  newRecipeFromStore: TRecipe | undefined,
  editRecipeFromStore: TRecipe | undefined,
): TPreparationStep[] => {
  const newPreparationSteps = newRecipeFromStore?.preparationSteps || [];
  const editPreparationSteps = editRecipeFromStore?.preparationSteps || [];
  const newPreparationStep: TPreparationStep = { description: '', order: 1 };

  let preparationSteps: TPreparationStep[];

  if (isEditMode) {
    preparationSteps = editPreparationSteps;
  } else {
    preparationSteps = newPreparationSteps?.length ? [...newPreparationSteps] : [newPreparationStep];
  }

  return preparationSteps;
};

export const isIngredientsFormValid = (values: IFormikProps) => {
  return values.ingredients.some(
    ingredient => !ingredient.name || ingredient.quantity === undefined || !ingredient.unit,
  );
};

export const nextEnabled = (values: IFormikProps, step: number) => {
  if (step === 0) {
    return !!values.title && !!values.description && !!values.servings && !!values.cookingTime;
  }
  if (step === 1) {
    return !isIngredientsFormValid(values);
  }
  if (step === 2) {
    return values.preparationSteps.length > 0;
  }
  return false;
};

export const removeTypename = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(v => removeTypename(v));
  } else if (typeof value === 'object' && value !== null) {
    const { __typename, ...rest } = value as TRemoveTypeObject;
    return Object.keys(rest).reduce((acc, key) => {
      acc[key] = removeTypename(rest[key]);
      return acc;
    }, {} as TRemoveTypeObject);
  }
  return value;
};
