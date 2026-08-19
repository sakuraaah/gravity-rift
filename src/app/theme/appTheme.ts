export const appTheme = {
  mode: 'dark',
  palette: {
    background: {
      page: '#ffffff',
      void: '#08030f',
      space: '#150a26',
      panel: '#1b0e33',
      raised: '#271447',
    },
    primary: {
      main: '#ff64a8',
      highlight: '#ffc1de',
      deep: '#9c2e66',
      contrastText: '#150a26',
    },
    secondary: {
      main: '#ffb24d',
      highlight: '#ffd27a',
      contrastText: '#150a26',
    },
    energy: {
      main: '#4fd6ff',
      highlight: '#bff0ff',
    },
    danger: {
      main: '#ff5c7a',
      contrastText: '#1a0410',
    },
    text: {
      high: '#f4e9ff',
      mid: '#c8b6dc',
      dim: '#9b7aa6',
    },
    border: {
      soft: 'rgba(255, 255, 255, 0.1)',
      selected: 'rgba(255, 255, 255, 0.6)',
      neon: 'rgba(255, 100, 168, 0.26)',
      amber: 'rgba(255, 178, 77, 0.34)',
    },
    glow: {
      magenta: 'rgba(255, 100, 168, 0.55)',
      amber: 'rgba(255, 178, 77, 0.5)',
      cyan: 'rgba(79, 214, 255, 0.55)',
      danger: 'rgba(255, 92, 122, 0.5)',
    },
    shadow: {
      hard: '#06010c',
    },
  },
  typography: {
    fontFamily: {
      display: "'Press Start 2P', monospace",
      body: "'Silkscreen', monospace",
    },
    fontSize: {
      hudLabel: '7px',
      small: '8px',
      control: '9px',
      body: '12px',
      hudValue: '14px',
      title: '22px',
      wordmark: '44px',
    },
    fontWeight: {
      regular: 400,
      bold: 700,
    },
  },
  radii: {
    button: '2px',
    control: '3px',
    iconButton: '4px',
    panel: '8px',
  },
  opacity: {
    disabled: 0.32,
  },
  shadows: {
    buttonHard: '3px 3px 0 #06010c',
    panel:
      '0 0 0 1px rgba(0, 0, 0, 0.4), 0 18px 40px -14px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(0, 0, 0, 0.3)',
  },
  transitions: {
    duration: {
      fast: '100ms',
      normal: '160ms',
    },
    easing: {
      standard: 'steps(2, end)',
    },
  },
  zIndex: {
    hud: 10,
    dialogBackdrop: 20,
    dialog: 30,
  },
} as const;

export type AppTheme = typeof appTheme;
