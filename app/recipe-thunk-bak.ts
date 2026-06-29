import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecipeResponse, RecipeResponseSchema } from './recipe-types';

interface FetchRecipesParams {
  q?: string;
  skip?: number;
  limit?: number;
}

export const fetchRecipesBak = createAsyncThunk<RecipeResponse, FetchRecipesParams, { rejectValue: string }>(
  'fetch-recipes',
  async ({ q = '', skip = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://spoonacular.com', {
        params: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          query: q,
          offset: skip,
          number: limit,
          addRecipeInformation: true,
          addRecipeNutrition: true,
          fillIngredients: true,
        },
      });

      const rawData = response.data;
      const formattedRecipes = (rawData.results || []).map((raw: any) => {
        const totalTime = raw.readyInMinutes || 0;
        const calories = raw.nutrition?.nutrients?.find((n: any) => n.name === 'Calories')?.amount || 0;
        let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
        if (totalTime < 20) difficulty = 'Easy';
        if (totalTime > 50) difficulty = 'Hard';
        return {
          id: raw.id,
          name: raw.title,
          ingredients: raw.extendedIngredients?.map((ing: any) => ing.original) || [],
          instructions: raw.analyzedInstructions?.[0]?.steps?.map((s: any) => s.step) || [],
          prepTimeMinutes: Math.round(totalTime * 0.4),
          cookTimeMinutes: Math.round(totalTime * 0.6),
          servings: raw.servings || 1,
          difficulty: difficulty,
          cuisine: raw.cuisines?.[0] || 'Universal',
          caloriesPerServing: Math.round(calories),
          tags: raw.dishTypes || [],
          userId: 1,
          image: raw.image,
          rating: 4.0,
          reviewCount: raw.aggregateLikes || 0,
          mealType: raw.dishTypes || [],
        };
      });
      const dummyJsonStructuredData = {
        recipes: formattedRecipes,
        total: rawData.totalResults || 0,
        skip: skip,
        limit: limit,
      };

      const validatedData = RecipeResponseSchema.parse(dummyJsonStructuredData);
      return validatedData;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch recipes');
    }
  },
);
