'use client';

import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Box, Card, CardActions, CardContent, CardMedia, Chip, Rating, Stack, Typography } from '@mui/material';
import { Recipe } from '../recipe-types';
import styles from './recipe-card.module.css';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card elevation={3} className={styles.card}>
      <CardMedia component="img" image={recipe.image} alt={recipe.name} sx={{ height: 240, objectFit: 'cover', backgroundColor: 'action.hover' }} />

      <CardContent className={styles.CardContent}>
        <Stack direction="row" spacing={1}>
          <Chip label={recipe.cuisine} size="small" color="primary" />
          <Chip label={recipe.difficulty} size="small" variant="outlined" />
          {/* {recipe.mealType.slice(0, 2).map((type) => (
            <Chip key={type} label={type} size="small" variant="outlined" />
          ))} */}
        </Stack>

        <Typography variant="h5" component="h3">
          {recipe.name}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Rating value={recipe.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            {recipe.rating.toFixed(1)} · {recipe.reviewCount} reviews
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Chip icon={<LocalDiningIcon />} label={`${recipe.servings} servings`} size="small" variant="outlined" />
          <Chip icon={<RestaurantIcon />} label={`${recipe.caloriesPerServing} kcal`} size="small" variant="outlined" />
        </Stack>

        <Box>
          <Typography variant="subtitle2" color="text.primary" gutterBottom>
            Key ingredients
          </Typography>
          <Stack component="ul" spacing={0.5}>
            {recipe.ingredients.slice(0, 3).map((ingredient) => (
              <Typography component="li" key={ingredient} variant="body2" color="text.secondary">
                {ingredient}
              </Typography>
            ))}
          </Stack>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, p: 2, pt: 0 }}>
        <Stack direction="row" spacing={1}>
          {recipe.tags.slice(0, 2).map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardActions>
    </Card>
  );
}
