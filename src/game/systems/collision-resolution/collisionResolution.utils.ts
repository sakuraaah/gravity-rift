import { CollisionKind } from '@/game/systems/collision';
import type {
  CollisionEvent,
  CollisionParticipant,
} from '@/game/systems/collision';

import { CollisionInteraction } from './collisionResolution.enums';

function isCollisionBetween(
  collision: CollisionEvent,
  firstKind: CollisionKind,
  secondKind: CollisionKind
) {
  return (
    (collision.a.kind === firstKind && collision.b.kind === secondKind) ||
    (collision.a.kind === secondKind && collision.b.kind === firstKind)
  );
}

export function getCollisionInteraction(
  collision: CollisionEvent
): CollisionInteraction | null {
  if (
    isCollisionBetween(
      collision,
      CollisionKind.Asteroid,
      CollisionKind.Asteroid
    )
  ) {
    return CollisionInteraction.AsteroidAsteroid;
  }

  if (
    isCollisionBetween(collision, CollisionKind.Bullet, CollisionKind.Asteroid)
  ) {
    return CollisionInteraction.BulletAsteroid;
  }

  if (
    isCollisionBetween(
      collision,
      CollisionKind.Spaceship,
      CollisionKind.Asteroid
    )
  ) {
    return CollisionInteraction.SpaceshipAsteroid;
  }

  return null;
}

export function getCollisionParticipant(
  collision: CollisionEvent,
  kind: CollisionKind
): CollisionParticipant | null {
  if (collision.a.kind === kind) {
    return collision.a;
  }

  if (collision.b.kind === kind) {
    return collision.b;
  }

  return null;
}
