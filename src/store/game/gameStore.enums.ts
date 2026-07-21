export const GamePhase = {
  GameOver: 'game-over',
  Paused: 'paused',
  Running: 'running',
} as const;

export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];
