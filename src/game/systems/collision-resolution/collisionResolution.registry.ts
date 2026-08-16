import { CollisionPhase } from '@/game/systems/collision';

import { CollisionInteraction } from './collisionResolution.enums';
import type { CollisionHandlerRegistry } from './collisionResolution.types';
import {
  handleAsteroidAsteroidCollision,
  handleBulletAsteroidCollision,
  handleSpaceshipAsteroidCollision,
  handleSpaceshipBlackHoleCollision,
} from './handlers';

export const collisionHandlerRegistry: CollisionHandlerRegistry = {
  [CollisionPhase.Enter]: {
    [CollisionInteraction.AsteroidAsteroid]: handleAsteroidAsteroidCollision,
    [CollisionInteraction.BulletAsteroid]: handleBulletAsteroidCollision,
    [CollisionInteraction.SpaceshipAsteroid]: handleSpaceshipAsteroidCollision,
    [CollisionInteraction.SpaceshipBlackHole]:
      handleSpaceshipBlackHoleCollision,
  },
  [CollisionPhase.Exit]: {},
  [CollisionPhase.Stay]: {},
};
