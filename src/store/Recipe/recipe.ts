import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipeState, TRecipe, TRecipeCleaned } from './types';

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
    setEditRecipe: (state, action: PayloadAction<TRecipe | TRecipeCleaned | undefined>) => {
      state.editableRecipe.recipe = action.payload;
    },
    setCompletedSteps: (state, action: PayloadAction<number>) => {
      if (!state.editableRecipe.completedSteps.includes(action.payload)) {
        state.editableRecipe.completedSteps.push(action.payload);
      }
    },
    resetEditRecipe: state => {
      state.editableRecipe = initialState.editableRecipe;
    },
  },
});

export const { setEditRecipe, resetEditRecipe, setCompletedSteps } = recipeSlice.actions;
export default recipeSlice.reducer;
