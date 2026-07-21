import type { CollisionEvent, CollisionPhase } from '@/game/systems/collision';

import type { CollisionInteraction } from './collisionResolution.enums';

export type CollisionResolutionParams = {
  gameTimeMs: number;
};

export type CollisionHandler = (
  collision: CollisionEvent,
  params: CollisionResolutionParams
) => void;

export type CollisionHandlerRegistry = Record<
  CollisionPhase,
  Partial<Record<CollisionInteraction, CollisionHandler>>
>;
