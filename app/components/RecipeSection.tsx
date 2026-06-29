'use client';

import { Box, Grid, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import RecipeCard from './RecipeCard';
import { Recipe } from '../recipe-types';

interface RecipeSectionProps {
  recipes: Recipe[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export default function RecipeSection({ recipes, loading, hasMore, loadMore }: RecipeSectionProps) {
  return (
    <Box component="section">
      <Typography variant="overline" color="primary">
        Recipe showcase
      </Typography>

      <InfiniteScroll
        dataLength={recipes.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <Typography color="text.secondary" align="center">
            Loading more recipes…
          </Typography>
        }
        endMessage={
          <Typography color="error" align="center">
            {recipes.length > 0 ? 'You have reached the end of the results.' : 'No recipes found.'}
          </Typography>
        }
      >
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid key={recipe.id} size={{ xs: 12, sm: 6, lg: 3 }}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      {!loading && recipes.length === 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          No recipes matched your search.
        </Typography>
      )}
    </Box>
  );
}
