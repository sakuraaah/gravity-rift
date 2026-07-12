import {
  GAME_LAYOUT,
  GAME_SCALE,
  GAME_SPEED_MULTIPLIER,
} from '@/game/constants';

import { ASTEROID_SIZE } from './asteroid.enums';
import type { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

export const ASTEROID_RADIUS_BY_SIZE: Record<AsteroidSize, number> = {
  [ASTEROID_SIZE.Large]: 15 * GAME_SCALE,
  [ASTEROID_SIZE.Medium]: 9 * GAME_SCALE,
  [ASTEROID_SIZE.Small]: 5 * GAME_SCALE,
};

export const ASTEROID_MOVEMENT_SPEED_BY_SIZE: Record<AsteroidSize, number> = {
  [ASTEROID_SIZE.Large]: 0.25 * GAME_SCALE * GAME_SPEED_MULTIPLIER,
  [ASTEROID_SIZE.Medium]: 0.35 * GAME_SCALE * GAME_SPEED_MULTIPLIER,
  [ASTEROID_SIZE.Small]: 0.45 * GAME_SCALE * GAME_SPEED_MULTIPLIER,
};

export const ASTEROID_DESPAWN_MARGIN =
  ASTEROID_RADIUS_BY_SIZE[ASTEROID_SIZE.Large] * 2;

export const ASTEROID_INITIAL_SPAWN: AsteroidSpawnData = {
  location: {
    x: -ASTEROID_DESPAWN_MARGIN,
    y: GAME_LAYOUT.Height / 2,
  },
  size: ASTEROID_SIZE.Large,
  velocity: {
    x: ASTEROID_MOVEMENT_SPEED_BY_SIZE[ASTEROID_SIZE.Large],
    y: 0,
  },
};
