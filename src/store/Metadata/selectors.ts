import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { MiscMessages } from '../../providers/IntlProviderContainer/types';
import { cleanMetadata } from '../../components/Recipe/RecipeFormEditor/utils';
import { miscMessages } from '../../messages';
import { RootState } from '..';
import { TAllMetadata, TMetadataCleaned, TMetadataType } from './types';

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
  const { formatMessage } = useIntl();
  const units = useGetAllMetadata().filter(metadata => metadata.type === TMetadataType.UNIT);
  return cleanMetadata(units).map(unit => {
    return {
      value: unit.value,
      label: formatMessage((miscMessages as MiscMessages)[unit.value]),
    };
  });
};

export const useGetCategories = (): TMetadataCleaned[] => {
  const { formatMessage } = useIntl();
  const categories = useGetAllMetadata().filter(metadata => metadata.type === TMetadataType.CATEGORY);
  return cleanMetadata(categories).map(category => {
    return {
      value: category.value,
      label: formatMessage((miscMessages as MiscMessages)[category.value]),
    };
  });
};

export const useGetLevels = (): TMetadataCleaned[] => {
  const { formatMessage } = useIntl();
  const levels = useGetAllMetadata().filter(metadata => metadata.type === TMetadataType.LEVEL);
  return cleanMetadata(levels).map(level => {
    return {
      value: level.value,
      label: formatMessage((miscMessages as MiscMessages)[level.value]),
    };
  });
};
