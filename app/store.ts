import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipe-slice';
const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;