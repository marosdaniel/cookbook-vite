import { useSelector } from 'react-redux';
import { RootState } from '..';
import { TAllMetadata, TMetadataCleaned, TMetadataType } from './types';
import { cleanMetadata } from '../../components/Recipe/RecipeFormEditor/utils';

export const selectMetadataState = (state: RootState) => state.metadata.allMetadata;
export const useMetadataState = () => useSelector(selectMetadataState);

export const useGetAllMetadata = (): TAllMetadata[] => {
  return useMetadataState() || [];
};

export const useGetLabels = (): TMetadataCleaned[] => {
  const labels = useGetAllMetadata().filter(metadata => metadata.type === TMetadataType.LABEL);
  return cleanMetadata(labels);
};

export const useGetUnits = (): TMetadataCleaned[] => {
  const units = useGetAllMetadata().filter(metadata => metadata.type === TMetadataType.UNIT);
  return cleanMetadata(units);
};

export const useGetCategories = (): TMetadataCleaned[] => {
  const categories = useGetAllMetadata().filter(metadata => metadata.type === TMetadataType.CATEGORY);
  return cleanMetadata(categories);
};

export const useGetLevels = (): TMetadataCleaned[] => {
  const levels = useGetAllMetadata().filter(metadata => metadata.type === TMetadataType.LEVEL);
  return cleanMetadata(levels);
};
