export const PlayerControl = {
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  KeyA: 'KeyA',
  KeyD: 'KeyD',
  KeyW: 'KeyW',
  Space: 'Space',
} as const;

export type PlayerControl = (typeof PlayerControl)[keyof typeof PlayerControl];

export const PlayerMouseButton = {
  Left: 0,
} as const;

export type PlayerMouseButton =
  (typeof PlayerMouseButton)[keyof typeof PlayerMouseButton];
