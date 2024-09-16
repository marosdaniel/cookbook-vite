import { useSelector } from 'react-redux';
import { RootState } from '..';
import { TMetadataPartial } from './types';

export const selectMetadataState = (state: RootState) => state.metadata;
export const useMetadataState = () => useSelector(selectMetadataState);

export const useGetLabels = (): TMetadataPartial[] => {
  return useMetadataState().labels || [];
};
