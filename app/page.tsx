'use client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import SearchBar from './search-bar';
import styles from './page.module.css';
import RecipeSection from './components/RecipeSection';
import { fetchRecipes } from './recipe-thunk';

export default function Home() {
  const [q, setQ] = useState<string>('');
  const [limit] = useState<number>(16);
  const [skip, setSkip] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, loading, hasMore } = useSelector((state: RootState) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipes({ q, limit, skip }));
  }, [dispatch, q, limit, skip]);

  const handleQueryChange = (value: string) => {
    setQ(value);
    setSkip(0);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setSkip((previousSkip) => previousSkip + limit);
    }
  };

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.hero}>
        <Typography variant="overline" color="primary">
          Recipe
        </Typography>
        <Typography variant="h2" className={styles.mainHeading} sx={{ fontWeight: 800 }}>
          Fresh recipes, and quick cooking inspiration
        </Typography>
      </Box>

      <Box className={styles.searchBar}>
        <SearchBar label="Find your Recipe" query={q} setQuery={handleQueryChange} />
        <Typography variant="body2" color="text.secondary">
          {loading ? 'Loading fresh recipes…' : `${recipes.length} recipes displayed`}
        </Typography>
      </Box>

      <RecipeSection recipes={recipes} loading={loading} hasMore={hasMore} loadMore={loadMore} />
    </Container>
  );
}
