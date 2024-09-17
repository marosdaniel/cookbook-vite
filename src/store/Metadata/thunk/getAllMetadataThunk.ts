import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_ALL_METADATA } from '../../../graphql/metadata/getMetadata';
import { client } from '../../../utils/graphqlClientConfig';
import { RootState } from '../..';
import { TAllMetadata } from '../types';

export const getAllMetadataThunk = createAsyncThunk<TAllMetadata[], void, { state: RootState }>(
  'metadata/getAllMetadataThunk',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query<{ getAllMetadata: TAllMetadata[] }>({
        query: GET_ALL_METADATA,
      });

      return data.getAllMetadata;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
