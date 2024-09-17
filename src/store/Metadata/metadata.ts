import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllMetadataThunk } from './thunk/getAllMetadataThunk';
import { IMetadataState, TAllMetadata } from './types';

const initialState: IMetadataState = {
  allMetadata: [],
};

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllMetadataThunk.fulfilled, (state, action: PayloadAction<TAllMetadata[]>) => {
      state.allMetadata = action.payload;
    });
  },
});

export const {} = metadataSlice.actions;
export default metadataSlice.reducer;
