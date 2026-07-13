import { GAME_LAYOUT, GAME_SCALE } from '@/game/constants';

import { ASTEROID_SIZE } from './asteroid.enums';
import type { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

export const ASTEROID_BASE_MOVEMENT_SPEED_BY_SIZE: Record<
  AsteroidSize,
  number
> = {
  [ASTEROID_SIZE.Large]: 0.15 * GAME_SCALE,
  [ASTEROID_SIZE.Medium]: 0.2 * GAME_SCALE,
  [ASTEROID_SIZE.Small]: 0.25 * GAME_SCALE,
};

export const ASTEROID_DESPAWN_MARGIN = 12 * GAME_SCALE;

export const ASTEROID_INITIAL_SPAWN: AsteroidSpawnData = {
  location: {
    x: -ASTEROID_DESPAWN_MARGIN,
    y: GAME_LAYOUT.Height / 2,
  },
  size: ASTEROID_SIZE.Large,
  velocity: {
    x: ASTEROID_BASE_MOVEMENT_SPEED_BY_SIZE[ASTEROID_SIZE.Large],
    y: 0,
  },
};
