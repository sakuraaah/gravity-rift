import { GAME_LAYOUT, GAME_SCALE } from '@/game/constants';

import { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

export const ASTEROID_BASE_MOVEMENT_SPEED_BY_SIZE: Record<
  AsteroidSize,
  number
> = {
  [AsteroidSize.Large]: 0.15 * GAME_SCALE,
  [AsteroidSize.Medium]: 0.2 * GAME_SCALE,
  [AsteroidSize.Small]: 0.25 * GAME_SCALE,
};

export const ASTEROID_DESPAWN_MARGIN = 12 * GAME_SCALE;

export const ASTEROID_INITIAL_SPAWN: AsteroidSpawnData = {
  location: {
    x: -ASTEROID_DESPAWN_MARGIN,
    y: GAME_LAYOUT.Height / 2,
  },
  size: AsteroidSize.Large,
  velocity: {
    x: ASTEROID_BASE_MOVEMENT_SPEED_BY_SIZE[AsteroidSize.Large],
    y: 0,
  },
};
