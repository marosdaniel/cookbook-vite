import { TCategoryMetadata, TLabelMetadata, TLevelMetadata, TMetadataCleaned } from '../Metadata/types';

export type TIngredientField = 'name' | 'quantity' | 'unit';
export interface IRecipeState {
  editableRecipe: {
    recipe: TRecipe | TRecipeCleaned | undefined;
    completedSteps: number[];
  };
}

export type TRecipe = {
  _id?: string;
  title: string;
  description: string;
  ingredients: TIngredient[];
  preparationSteps: TPreparationStep[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  imgSrc?: string;
  cookingTime: number;
  difficultyLevel: TLevelMetadata;
  category: TCategoryMetadata;
  labels: TLabelMetadata[] | [];
  servings: number;
  youtubeLink?: string;
  isFavorite?: boolean;
};

export type TRecipeCleaned = {
  _id?: string;
  title: string;
  description: string;
  ingredients: TIngredient[];
  preparationSteps: TPreparationStep[];
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  imgSrc?: string;
  cookingTime: number;
  difficultyLevel?: TMetadataCleaned;
  category?: TMetadataCleaned;
  labels?: TMetadataCleaned[] | [];
  servings: number;
  youtubeLink?: string;
};

export type TNewRecipe = {
  title?: string;
  description?: string;
  ingredients?: TIngredient[];
  preparationSteps?: TPreparationStep[];
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  imgSrc?: string;
  cookingTime?: number;
  difficultyLevel?: TLevelMetadata;
  category?: TCategoryMetadata;
  labels?: TLabelMetadata[] | [];
  servings?: number;
  youtubeLink?: string;
};

export type TIngredient = {
  localId: string;
  name: string;
  quantity: number;
  unit: string;
};

export type TPreparationStep = {
  description: string;
  order: number;
};
