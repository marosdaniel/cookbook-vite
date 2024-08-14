import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipeState, TRecipe, TStepNumber } from './types';

const initialState: IRecipeState = {
  editableRecipe: {
    recipe: undefined,
    completedSteps: [],
  },
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setEditRecipe: (state, action: PayloadAction<TRecipe>) => {
      state.editableRecipe.recipe = action.payload;
    },
    setCompletedSteps: (state, action: PayloadAction<TStepNumber[]>) => {
      state.editableRecipe.completedSteps = action.payload;
    },
    resetEditRecipe: state => {
      state.editableRecipe = initialState.editableRecipe;
    },
  },
});

export const { setEditRecipe, resetEditRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
