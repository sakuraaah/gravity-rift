import { CollisionKind } from '@/game/systems/collision';
import type { CollisionEvent } from '@/game/systems/collision';
import { getCollisionParticipant } from '@/game/systems/collision-resolution/collisionResolution.utils';
import { useAppStore } from '@/store';

export function handleSpaceshipBlackHoleCollision(collision: CollisionEvent) {
  const spaceship = getCollisionParticipant(collision, CollisionKind.Spaceship);
  const blackHole = getCollisionParticipant(collision, CollisionKind.BlackHole);

  if (!spaceship || !blackHole) {
    return;
  }

  useAppStore.getState().defeatPlayer();
}
