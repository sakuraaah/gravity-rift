import { ASTEROID_SIZE } from '@/game/entities/asteroid/asteroid.enums';
import type { AsteroidSize } from '@/game/entities/asteroid/asteroid.enums';

import type { AsteroidSpawnConfig } from './asteroidSpawn.types';

export const ASTEROID_SPAWN_SIZES = [
  ASTEROID_SIZE.Small,
  ASTEROID_SIZE.Medium,
  ASTEROID_SIZE.Large,
] as const;

export const ASTEROID_SPAWN_CONFIG_BY_SIZE: Record<
  AsteroidSize,
  AsteroidSpawnConfig
> = {
  [ASTEROID_SIZE.Small]: {
    initialDelayMs: 900,
    intervalJitterRatio: 0.35,
    maxDeviationDegrees: 6,
    maxIntervalMs: 3400,
    maxSpawnAttempts: 8,
    meanIntervalMs: 2200,
    minIntervalMs: 1400,
    minSpawnDistance: 42,
  },
  [ASTEROID_SIZE.Medium]: {
    initialDelayMs: 1800,
    intervalJitterRatio: 0.3,
    maxDeviationDegrees: 9,
    maxIntervalMs: 5800,
    maxSpawnAttempts: 8,
    meanIntervalMs: 4200,
    minIntervalMs: 2800,
    minSpawnDistance: 54,
  },
  [ASTEROID_SIZE.Large]: {
    initialDelayMs: 3200,
    intervalJitterRatio: 0.25,
    maxDeviationDegrees: 12,
    maxIntervalMs: 9000,
    maxSpawnAttempts: 8,
    meanIntervalMs: 7000,
    minIntervalMs: 5200,
    minSpawnDistance: 68,
  },
};
