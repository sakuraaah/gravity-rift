export const SpaceshipEffect = {
  Blink: 'blink',
  FastBlink: 'fast-blink',
  Flash: 'flash',
} as const;

export type SpaceshipEffect =
  (typeof SpaceshipEffect)[keyof typeof SpaceshipEffect];
