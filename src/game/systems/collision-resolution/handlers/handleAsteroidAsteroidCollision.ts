import { CollisionKind } from '@/game/systems/collision';
import type { CollisionEvent } from '@/game/systems/collision';
import { getCollisionParticipant } from '@/game/systems/collision-resolution/collisionResolution.utils';

export function handleAsteroidAsteroidCollision(collision: CollisionEvent) {
  const firstAsteroid = getCollisionParticipant(
    collision,
    CollisionKind.Asteroid
  );

  if (!firstAsteroid) {
    return;
  }

  const secondAsteroid =
    collision.a === firstAsteroid ? collision.b : collision.a;

  console.log(
    `[collision:${collision.phase}] Asteroid ${firstAsteroid.id} hit asteroid ${secondAsteroid.id}`
  );
}
