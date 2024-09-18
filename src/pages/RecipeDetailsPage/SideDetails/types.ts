import { TMetadataCleaned } from '../../../store/Metadata/types';

export interface IProps {
  servings: number;
  cookingTime: number;
  difficultyLevel: TMetadataCleaned;
}
