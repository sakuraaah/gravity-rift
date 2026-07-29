import '@emotion/react';

import type { AppTheme } from './appTheme';

declare module '@emotion/react' {
  export interface Theme {
    mode: AppTheme['mode'];
    opacity: AppTheme['opacity'];
    palette: AppTheme['palette'];
    radii: AppTheme['radii'];
    shadows: AppTheme['shadows'];
    transitions: AppTheme['transitions'];
    typography: AppTheme['typography'];
    zIndex: AppTheme['zIndex'];
  }
}
