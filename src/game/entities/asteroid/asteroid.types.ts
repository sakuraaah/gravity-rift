import type { Vector2 } from '@/game/utils';

import type { AsteroidSize } from './asteroid.enums';

export type AsteroidLocation = Vector2;

export type AsteroidSpawnData = {
  location: AsteroidLocation;
  size: AsteroidSize;
  velocity: Vector2;
};
