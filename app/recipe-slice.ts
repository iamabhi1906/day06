import { createSlice } from '@reduxjs/toolkit';
import { Recipe } from './recipe-types';
import { fetchRecipes } from './recipe-thunk';

interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
}

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
  hasMore: true,
  total: 0,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;

        if (action.meta.arg.skip && action.meta.arg.skip > 0) {
          state.recipes = [...state.recipes, ...action.payload.recipes];
        } else {
          state.recipes = action.payload.recipes;
        }

        state.total = action.payload.total;
        state.hasMore = state.recipes.length < state.total;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error From thunk';
      });
  },
});

export default recipeSlice.reducer;
