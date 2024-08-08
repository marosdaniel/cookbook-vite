import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipeState, TRecipe } from './types';

const initialState: IRecipeState = {
  newRecipe: undefined,
  editRecipe: undefined,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    newRecipe: (state, action: PayloadAction<TRecipe>) => {
      state.newRecipe = action.payload;
    },
    resetNewRecipe: state => {
      state.newRecipe = undefined;
    },
    setEditRecipe: (state, action: PayloadAction<TRecipe>) => {
      state.editRecipe = action.payload;
    },
    resetEditRecipe: state => {
      state.editRecipe = undefined;
    },
  },
});

export const { newRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
