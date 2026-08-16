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

  if (
    isCollisionBetween(
      collision,
      CollisionKind.Spaceship,
      CollisionKind.BlackHole
    )
  ) {
    return CollisionInteraction.SpaceshipBlackHole;
  }

  return null;
}

export function getCollisionParticipant<TKind extends CollisionKind>(
  collision: CollisionEvent,
  kind: TKind
): Extract<CollisionParticipant, { kind: TKind }> | null {
  if (collision.a.kind === kind) {
    return collision.a as Extract<CollisionParticipant, { kind: TKind }>;
  }

  if (collision.b.kind === kind) {
    return collision.b as Extract<CollisionParticipant, { kind: TKind }>;
  }

  return null;
}
