import { AsteroidSize } from '@/game/entities/asteroid/asteroid.enums';

import type {
  AsteroidSpawnConfig,
  AsteroidSpawnSideWeights,
} from './asteroidSpawn.types';

export const ASTEROID_SPAWN_SIDE_WEIGHTS = {
  bottom: 0.75,
  left: 0.25,
  right: 5,
  top: 0.75,
} as const satisfies AsteroidSpawnSideWeights;

export const ASTEROID_SPAWN_SIZES = [
  AsteroidSize.Small,
  AsteroidSize.Medium,
  AsteroidSize.Large,
] as const;

export const ASTEROID_SPAWN_CONFIG_BY_SIZE = {
  [AsteroidSize.Small]: {
    initialDelayMs: 1200,
    intervalJitterRatio: 0.35,
    maxDeviationDegrees: 10,
    maxIntervalMs: 4500,
    maxSpawnAttempts: 8,
    meanIntervalMs: 3000,
    minIntervalMs: 1900,
    minSpawnDistance: 42,
  },
  [AsteroidSize.Medium]: {
    initialDelayMs: 2400,
    intervalJitterRatio: 0.3,
    maxDeviationDegrees: 15,
    maxIntervalMs: 7500,
    maxSpawnAttempts: 8,
    meanIntervalMs: 5500,
    minIntervalMs: 3600,
    minSpawnDistance: 54,
  },
  [AsteroidSize.Large]: {
    initialDelayMs: 4200,
    intervalJitterRatio: 0.25,
    maxDeviationDegrees: 20,
    maxIntervalMs: 11500,
    maxSpawnAttempts: 8,
    meanIntervalMs: 9000,
    minIntervalMs: 6800,
    minSpawnDistance: 68,
  },
} as const satisfies Record<AsteroidSize, AsteroidSpawnConfig>;
