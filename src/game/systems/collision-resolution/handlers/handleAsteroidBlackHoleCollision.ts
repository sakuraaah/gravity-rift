import { OneShotEffectKind } from '@/game/effects/one-shot-effect/oneShotEffect.enums';
import { CollisionKind } from '@/game/systems/collision';
import type { CollisionEvent } from '@/game/systems/collision';
import type { CollisionResolutionParams } from '@/game/systems/collision-resolution/collisionResolution.types';
import { getCollisionParticipant } from '@/game/systems/collision-resolution/collisionResolution.utils';

export function handleAsteroidBlackHoleCollision(
  collision: CollisionEvent,
  params: CollisionResolutionParams
) {
  const asteroid = getCollisionParticipant(collision, CollisionKind.Asteroid);
  const blackHole = getCollisionParticipant(collision, CollisionKind.BlackHole);

  if (!asteroid || !blackHole) {
    return;
  }

  const asteroidActor = asteroid.actor;
  const asteroidPosition = {
    x: asteroidActor.position.x,
    y: asteroidActor.position.y,
  };
  const asteroidSize = asteroidActor.size;
  const damageResult = asteroidActor.destroyEntity();

  if (!damageResult?.destroyed) {
    return;
  }

  params.playOneShotEffect({
    kind: OneShotEffectKind.AsteroidExplosion,
    position: asteroidPosition,
    size: asteroidSize,
  });
}
