import { CollisionKind } from '@/game/systems/collision';
import type { CollisionEvent } from '@/game/systems/collision';
import { getCollisionParticipant } from '@/game/systems/collision-resolution/collisionResolution.utils';
import { useGameStore } from '@/store';

export function handleSpaceshipAsteroidCollision(collision: CollisionEvent) {
  const spaceship = getCollisionParticipant(collision, CollisionKind.Spaceship);
  const asteroid = getCollisionParticipant(collision, CollisionKind.Asteroid);

  if (!spaceship || !asteroid) {
    return;
  }

  const asteroidActor = asteroid.actor;

  if (!asteroidActor.isActive) {
    return;
  }

  useGameStore.getState().damagePlayer(asteroidActor.contactDamage);
}
