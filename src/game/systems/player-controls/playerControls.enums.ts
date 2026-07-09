export const PlayerControl = {
  Fire: 'Space',
  MoveUpPrimary: 'KeyW',
  MoveUpSecondary: 'ArrowUp',
  MoveLeftPrimary: 'KeyA',
  MoveLeftSecondary: 'ArrowLeft',
  MoveRightPrimary: 'KeyD',
  MoveRightSecondary: 'ArrowRight',
} as const;

export type PlayerControl = (typeof PlayerControl)[keyof typeof PlayerControl];

export const PlayerMouseButton = {
  Fire: 1,
} as const;

export type PlayerMouseButton =
  (typeof PlayerMouseButton)[keyof typeof PlayerMouseButton];
