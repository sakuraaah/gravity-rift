export const PlayerControl = {
  MoveUpPrimary: 'KeyW',
  MoveUpSecondary: 'ArrowUp',
  MoveLeftPrimary: 'KeyA',
  MoveLeftSecondary: 'ArrowLeft',
  MoveRightPrimary: 'KeyD',
  MoveRightSecondary: 'ArrowRight',
} as const;

export type PlayerControl = (typeof PlayerControl)[keyof typeof PlayerControl];
