import type { AsteroidSize } from '@/game/entities/asteroid/asteroid.enums';
import type { Vector2 } from '@/game/utils';

export type AsteroidSpawnBounds = {
  height: number;
  width: number;
};

export type AsteroidSpawnConfig = {
  initialDelayMs: number;
  intervalJitterRatio: number;
  maxDeviationDegrees: number;
  maxIntervalMs: number;
  maxSpawnAttempts: number;
  meanIntervalMs: number;
  minIntervalMs: number;
  minSpawnDistance: number;
};

export type AsteroidSpawnOptions = {
  bounds: AsteroidSpawnBounds;
  margin: number;
  occupiedLocations: Vector2[];
  size: AsteroidSize;
  target: Vector2;
};
