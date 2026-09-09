export const AppScreen = {
  Game: 'game',
  MainMenu: 'main-menu',
} as const;

export type AppScreen = (typeof AppScreen)[keyof typeof AppScreen];

export const GamePhase = {
  Dying: 'dying',
  GameOver: 'game-over',
  HowToPlay: 'how-to-play',
  Idle: 'idle',
  Paused: 'paused',
  Running: 'running',
} as const;

export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];
