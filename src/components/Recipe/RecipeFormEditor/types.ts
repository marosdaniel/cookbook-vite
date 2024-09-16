import { TCategoryMetadata, TLevelMetadata, TMetadataPartial } from '../../../store/Metadata/types';
import { TIngredient, TPreparationStep } from '../../../store/Recipe/types';

export interface IProps {
  title: string;
  id: string;
  isEditMode?: boolean;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface RenderItemOptions {
  item: TIngredient;
  handleRemoveIngredient: (item: string) => void;
  handleIngredientChange: (item: TIngredient) => void;
}

export interface IFormikProps {
  title: string;
  description: string;
  imgSrc?: string;
  cookingTime: number;
  difficultyLevel: TLevelMetadata | undefined;
  category: TCategoryMetadata | undefined;
  labels: TMetadataPartial[] | [];
  ingredients: TIngredient[] | [];
  preparationSteps: TPreparationStep[] | [];
  servings: number;
  youtubeLink?: string;
}

export type TRemoveTypeObject = { [key: string]: any };
