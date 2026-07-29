import { GAME_LAYOUT, GAME_SCALE } from '@/game/constants';

import { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

export const ASTEROID_BASE_MOVEMENT_SPEED_BY_SIZE = {
  [AsteroidSize.Large]: 0.15 * GAME_SCALE,
  [AsteroidSize.Medium]: 0.2 * GAME_SCALE,
  [AsteroidSize.Small]: 0.25 * GAME_SCALE,
} as const satisfies Record<AsteroidSize, number>;

// Source: Concept sprite manifest. The values are radii in the unscaled concept
// coordinate system, so they use the same scale as the sprites.
export const ASTEROID_HITBOX_RADIUS_BY_SIZE = {
  [AsteroidSize.Large]: 7.5 * GAME_SCALE,
  [AsteroidSize.Medium]: 4.5 * GAME_SCALE,
  [AsteroidSize.Small]: 3 * GAME_SCALE,
} as const satisfies Record<AsteroidSize, number>;

export const ASTEROID_MAX_HP_BY_SIZE = {
  [AsteroidSize.Large]: 3,
  [AsteroidSize.Medium]: 2,
  [AsteroidSize.Small]: 1,
} as const satisfies Record<AsteroidSize, number>;

export const ASTEROID_CONTACT_DAMAGE_BY_SIZE = {
  [AsteroidSize.Large]: 1,
  [AsteroidSize.Medium]: 1,
  [AsteroidSize.Small]: 1,
} as const satisfies Record<AsteroidSize, number>;

export const ASTEROID_DESPAWN_MARGIN = 12 * GAME_SCALE;

export const ASTEROID_INITIAL_SPAWN = {
  location: {
    x: -ASTEROID_DESPAWN_MARGIN,
    y: GAME_LAYOUT.Height / 2,
  },
  size: AsteroidSize.Large,
  velocity: {
    x: ASTEROID_BASE_MOVEMENT_SPEED_BY_SIZE[AsteroidSize.Large],
    y: 0,
  },
} as const satisfies AsteroidSpawnData;
