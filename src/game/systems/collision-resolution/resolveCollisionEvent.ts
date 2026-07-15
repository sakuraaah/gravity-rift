import type { CollisionEvent } from '@/game/systems/collision';

import { collisionHandlerRegistry } from './collisionResolution.registry';
import { getCollisionInteraction } from './collisionResolution.utils';

export function resolveCollisionEvent(collision: CollisionEvent) {
  const interaction = getCollisionInteraction(collision);

  if (!interaction) {
    return;
  }

  const handler = collisionHandlerRegistry[collision.phase][interaction];

  handler?.(collision);
}
