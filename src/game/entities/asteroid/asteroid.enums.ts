export const ASTEROID_SIZE = {
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
} as const;

export type AsteroidSize = (typeof ASTEROID_SIZE)[keyof typeof ASTEROID_SIZE];
