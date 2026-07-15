import { CollisionKind } from '@/game/systems/collision';
import type { CollisionEvent } from '@/game/systems/collision';
import { getCollisionParticipant } from '@/game/systems/collision-resolution/collisionResolution.utils';

export function handleSpaceshipAsteroidCollision(collision: CollisionEvent) {
  const spaceship = getCollisionParticipant(collision, CollisionKind.Spaceship);
  const asteroid = getCollisionParticipant(collision, CollisionKind.Asteroid);

  if (!spaceship || !asteroid) {
    return;
  }

  console.log(
    `[collision:${collision.phase}] Spaceship ${spaceship.id} hit asteroid ${asteroid.id}`
  );
}
