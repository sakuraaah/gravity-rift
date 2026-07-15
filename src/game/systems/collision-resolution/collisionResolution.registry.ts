import { CollisionPhase } from '@/game/systems/collision';

import { CollisionInteraction } from './collisionResolution.enums';
import type { CollisionHandlerRegistry } from './collisionResolution.types';
import {
  handleAsteroidAsteroidCollision,
  handleBulletAsteroidCollision,
  handleSpaceshipAsteroidCollision,
} from './handlers';

export const collisionHandlerRegistry: CollisionHandlerRegistry = {
  [CollisionPhase.Enter]: {
    [CollisionInteraction.AsteroidAsteroid]: handleAsteroidAsteroidCollision,
    [CollisionInteraction.BulletAsteroid]: handleBulletAsteroidCollision,
    [CollisionInteraction.SpaceshipAsteroid]: handleSpaceshipAsteroidCollision,
  },
  [CollisionPhase.Exit]: {},
  [CollisionPhase.Stay]: {},
};
