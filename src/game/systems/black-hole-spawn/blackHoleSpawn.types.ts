import type { BlackHoleSpawnData } from '@/game/entities/black-hole/blackHole.types';
import type { Vector2 } from '@/game/utils';

export type BlackHoleSpawnBounds = {
  height: number;
  width: number;
};

export type BlackHoleSpawnConfig = {
  intervalJitterRatio: number;
  maxSpawnAttempts: number;
  meanIntervalMs: number;
  minCenterDistance: number;
};

export type BlackHoleSpawnOptions = {
  bounds: BlackHoleSpawnBounds;
  occupiedLocations: Vector2[];
};

export type BlackHoleSpawnResult = BlackHoleSpawnData | null;
