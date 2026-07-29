import type { ReactNode } from 'react';

import { AppThemeProvider } from '@/app/theme';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}
