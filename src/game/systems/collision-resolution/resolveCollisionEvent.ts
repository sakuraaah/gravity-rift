import type { CollisionEvent } from '@/game/systems/collision';

import { collisionHandlerRegistry } from './collisionResolution.registry';
import type { CollisionResolutionParams } from './collisionResolution.types';
import { getCollisionInteraction } from './collisionResolution.utils';

export function resolveCollisionEvent(
  collision: CollisionEvent,
  params: CollisionResolutionParams
) {
  const interaction = getCollisionInteraction(collision);

  if (!interaction) {
    return;
  }

  const handler = collisionHandlerRegistry[collision.phase][interaction];

  handler?.(collision, params);
}
