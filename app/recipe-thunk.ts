import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecipeResponse, RecipeResponseSchema } from './recipe-types';

interface FetchRecipesParams {
  q?: string;
  skip?: number;
  limit?: number;
}

export const fetchRecipes = createAsyncThunk<RecipeResponse, FetchRecipesParams, { rejectValue: string }>(
  'fetch-recipes',
  async ({ q = '', skip = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes/search', {
        params: { q, skip, limit },
      });
      const data = RecipeResponseSchema.parse(response.data);
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch recipes');
    }
  },
);
