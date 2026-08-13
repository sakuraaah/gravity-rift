import { BLACK_HOLE_FRAME_SIZE } from '@/game/entities/black-hole/blackHole.constants';

import type { BlackHoleSpawnConfig } from './blackHoleSpawn.types';

export const BLACK_HOLE_MAX_ACTIVE_COUNT = 5;

export const BLACK_HOLE_SPAWN_CONFIG = {
  intervalJitterRatio: 1 / 3,
  maxSpawnAttempts: 32,
  meanIntervalMs: 60000,
  minCenterDistance: BLACK_HOLE_FRAME_SIZE,
} as const satisfies BlackHoleSpawnConfig;
