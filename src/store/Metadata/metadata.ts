import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMetadataState, TMetadataPartial } from './types';
import { getLabelsThunk } from './thunk/getLabelsThunk';

const initialState: IMetadataState = {};

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLabelsThunk.fulfilled, (state, action: PayloadAction<TMetadataPartial[]>) => {
      state.labels = action.payload;
    });
  },
});

export const {} = metadataSlice.actions;
export default metadataSlice.reducer;
