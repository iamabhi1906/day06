import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTimeMinutes: z.number(),
  cookTimeMinutes: z.number(),
  servings: z.number(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  cuisine: z.string(),
  caloriesPerServing: z.number(),
  tags: z.array(z.string()),
  userId: z.number(),
  image: z.url(),
  rating: z.number(),
  reviewCount: z.number(),
  mealType: z.array(z.string()),
});

export const RecipeResponseSchema = z.object({
  recipes: z.array(RecipeSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type RecipeResponse = z.infer<typeof RecipeResponseSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;
