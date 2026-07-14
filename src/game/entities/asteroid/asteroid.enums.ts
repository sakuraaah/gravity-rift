export const AsteroidSize = {
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
} as const;

export type AsteroidSize = (typeof AsteroidSize)[keyof typeof AsteroidSize];
