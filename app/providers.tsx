'use client';

import { Provider } from 'react-redux';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import store from './store';
import ThemeProviderComp from './theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider>
        <ThemeProviderComp>{children}</ThemeProviderComp>
      </AppRouterCacheProvider>
    </Provider>
  );
}
