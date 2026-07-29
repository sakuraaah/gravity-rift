import type { ReactNode } from 'react';

import { ThemeProvider } from '@emotion/react';
import '@fontsource/press-start-2p/400.css';
import '@fontsource/silkscreen/400.css';
import '@fontsource/silkscreen/700.css';

import { AppGlobalStyles } from './AppGlobalStyles';
import { appTheme } from './appTheme';

type AppThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <AppGlobalStyles />
      {children}
    </ThemeProvider>
  );
}
