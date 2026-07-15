import { CollisionKind } from '@/game/systems/collision';
import type { CollisionEvent } from '@/game/systems/collision';
import { getCollisionParticipant } from '@/game/systems/collision-resolution/collisionResolution.utils';

export function handleBulletAsteroidCollision(collision: CollisionEvent) {
  const bullet = getCollisionParticipant(collision, CollisionKind.Bullet);
  const asteroid = getCollisionParticipant(collision, CollisionKind.Asteroid);

  if (!bullet || !asteroid) {
    return;
  }

  console.log(
    `[collision:${collision.phase}] Bullet ${bullet.id} hit asteroid ${asteroid.id}`
  );
}
