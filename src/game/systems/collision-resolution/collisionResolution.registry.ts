import { CollisionPhase } from '@/game/systems/collision';

import { CollisionInteraction } from './collisionResolution.enums';
import type { CollisionHandlerRegistry } from './collisionResolution.types';
import {
  handleAsteroidAsteroidCollision,
  handleAsteroidBlackHoleCollision,
  handleBulletAsteroidCollision,
  handleBulletBlackHoleCollision,
  handleSpaceshipAsteroidCollision,
  handleSpaceshipBlackHoleCollision,
} from './handlers';

export const collisionHandlerRegistry: CollisionHandlerRegistry = {
  [CollisionPhase.Enter]: {
    [CollisionInteraction.AsteroidBlackHole]: handleAsteroidBlackHoleCollision,
    [CollisionInteraction.AsteroidAsteroid]: handleAsteroidAsteroidCollision,
    [CollisionInteraction.BulletAsteroid]: handleBulletAsteroidCollision,
    [CollisionInteraction.BulletBlackHole]: handleBulletBlackHoleCollision,
    [CollisionInteraction.SpaceshipAsteroid]: handleSpaceshipAsteroidCollision,
    [CollisionInteraction.SpaceshipBlackHole]:
      handleSpaceshipBlackHoleCollision,
  },
  [CollisionPhase.Exit]: {},
  [CollisionPhase.Stay]: {},
};
