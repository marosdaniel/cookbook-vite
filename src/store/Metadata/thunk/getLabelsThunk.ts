import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_METADATA_BY_TYPE } from '../../../graphql/metadata/getMetadata';
import { client } from '../../../utils/graphqlClientConfig';
import { RootState } from '../..';
import { TLabelMetadata, TMetadataPartial, TMetadataType } from '../types';
import { cleanLabels } from '../../../components/Recipe/RecipeFormEditor/utils';

export const getLabelsThunk = createAsyncThunk<TMetadataPartial[], void, { state: RootState }>(
  'metadata/getLabelsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query<{ getMetadataByType: TLabelMetadata[] }>({
        query: GET_METADATA_BY_TYPE,
        variables: { type: TMetadataType.LABEL },
      });

      return cleanLabels(data.getMetadataByType) || [];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
