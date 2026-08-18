import { OneShotEffectKind } from '@/game/effects/one-shot-effect/oneShotEffect.enums';
import { CollisionKind } from '@/game/systems/collision';
import type { CollisionEvent } from '@/game/systems/collision';
import type { CollisionResolutionParams } from '@/game/systems/collision-resolution/collisionResolution.types';
import { getCollisionParticipant } from '@/game/systems/collision-resolution/collisionResolution.utils';

export function handleBulletBlackHoleCollision(
  collision: CollisionEvent,
  params: CollisionResolutionParams
) {
  const bullet = getCollisionParticipant(collision, CollisionKind.Bullet);
  const blackHole = getCollisionParticipant(collision, CollisionKind.BlackHole);

  if (!bullet || !blackHole) {
    return;
  }

  const bulletActor = bullet.actor;
  const bulletPosition = {
    x: bulletActor.position.x,
    y: bulletActor.position.y,
  };

  if (!bulletActor.consume()) {
    return;
  }

  params.playOneShotEffect({
    kind: OneShotEffectKind.BulletSpark,
    position: bulletPosition,
  });
}
