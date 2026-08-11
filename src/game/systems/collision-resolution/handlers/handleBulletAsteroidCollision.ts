import { OneShotEffectKind } from '@/game/effects/one-shot-effect/oneShotEffect.enums';
import { CollisionKind } from '@/game/systems/collision';
import type { CollisionEvent } from '@/game/systems/collision';
import type { CollisionResolutionParams } from '@/game/systems/collision-resolution/collisionResolution.types';
import { getCollisionParticipant } from '@/game/systems/collision-resolution/collisionResolution.utils';

export function handleBulletAsteroidCollision(
  collision: CollisionEvent,
  params: CollisionResolutionParams
) {
  const bullet = getCollisionParticipant(collision, CollisionKind.Bullet);
  const asteroid = getCollisionParticipant(collision, CollisionKind.Asteroid);

  if (!bullet || !asteroid) {
    return;
  }

  const bulletActor = bullet.actor;
  const asteroidActor = asteroid.actor;

  if (!asteroidActor.isActive) {
    return;
  }

  const bulletDamage = bulletActor.damage;
  const bulletPosition = {
    x: bulletActor.position.x,
    y: bulletActor.position.y,
  };
  const asteroidPosition = {
    x: asteroidActor.position.x,
    y: asteroidActor.position.y,
  };
  const asteroidSize = asteroidActor.size;

  if (!bulletActor.consume()) {
    return;
  }

  const damageResult = asteroidActor.takeDamage(bulletDamage);

  if (!damageResult) {
    return;
  }

  if (damageResult.destroyed) {
    params.playOneShotEffect({
      kind: OneShotEffectKind.AsteroidExplosion,
      position: asteroidPosition,
      size: asteroidSize,
    });

    return;
  }

  if (damageResult.appliedDamage > 0) {
    asteroidActor.flash();
  }

  params.playOneShotEffect({
    kind: OneShotEffectKind.BulletSpark,
    position: bulletPosition,
  });
}
