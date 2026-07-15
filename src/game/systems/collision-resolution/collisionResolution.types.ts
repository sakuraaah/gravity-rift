import type { CollisionEvent, CollisionPhase } from '@/game/systems/collision';

import type { CollisionInteraction } from './collisionResolution.enums';

export type CollisionHandler = (collision: CollisionEvent) => void;

export type CollisionHandlerRegistry = Record<
  CollisionPhase,
  Partial<Record<CollisionInteraction, CollisionHandler>>
>;
