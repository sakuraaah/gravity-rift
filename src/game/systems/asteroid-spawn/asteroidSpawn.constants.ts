import { ASTEROID_SIZE } from '@/game/entities/asteroid/asteroid.enums';
import type { AsteroidSize } from '@/game/entities/asteroid/asteroid.enums';

import type {
  AsteroidSpawnConfig,
  AsteroidSpawnSideWeights,
} from './asteroidSpawn.types';

export const ASTEROID_SPAWN_SIDE_WEIGHTS: AsteroidSpawnSideWeights = {
  bottom: 0.75,
  left: 0.25,
  right: 5,
  top: 0.75,
};

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
    initialDelayMs: 1200,
    intervalJitterRatio: 0.35,
    maxDeviationDegrees: 10,
    maxIntervalMs: 4500,
    maxSpawnAttempts: 8,
    meanIntervalMs: 3000,
    minIntervalMs: 1900,
    minSpawnDistance: 42,
  },
  [ASTEROID_SIZE.Medium]: {
    initialDelayMs: 2400,
    intervalJitterRatio: 0.3,
    maxDeviationDegrees: 15,
    maxIntervalMs: 7500,
    maxSpawnAttempts: 8,
    meanIntervalMs: 5500,
    minIntervalMs: 3600,
    minSpawnDistance: 54,
  },
  [ASTEROID_SIZE.Large]: {
    initialDelayMs: 4200,
    intervalJitterRatio: 0.25,
    maxDeviationDegrees: 20,
    maxIntervalMs: 11500,
    maxSpawnAttempts: 8,
    meanIntervalMs: 9000,
    minIntervalMs: 6800,
    minSpawnDistance: 68,
  },
};
