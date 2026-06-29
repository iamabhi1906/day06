'use client';

import { Provider } from 'react-redux';
import store from './store';
import ThemeProviderComp from './theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProviderComp>{children}</ThemeProviderComp>
    </Provider>
  );
}
