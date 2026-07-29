import { Global, useTheme } from '@emotion/react';

export function AppGlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={{
        '*': {
          boxSizing: 'border-box',
        },
        'html, body, #app, #pixi-container': {
          minHeight: '100%',
        },
        body: {
          color: theme.palette.text.mid,
          backgroundColor: theme.palette.background.page,
          fontFamily: theme.typography.fontFamily.body,
        },
        'button, input, select, textarea': {
          font: 'inherit',
        },
        button: {
          color: 'inherit',
        },
        '#pixi-container': {
          backgroundColor: theme.palette.background.page,
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            scrollBehavior: 'auto',
            animationDuration: '0.01ms',
            animationIterationCount: 1,
            transitionDuration: '0.01ms',
          },
        },
      }}
    />
  );
}
