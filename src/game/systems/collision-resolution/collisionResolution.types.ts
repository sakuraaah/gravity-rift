import type { OneShotEffectRequest } from '@/game/effects';
import type { CollisionEvent, CollisionPhase } from '@/game/systems/collision';

import type { CollisionInteraction } from './collisionResolution.enums';

export type CollisionResolutionParams = {
  gameTimeMs: number;
  playOneShotEffect: (request: OneShotEffectRequest) => void;
};

export type CollisionHandler = (
  collision: CollisionEvent,
  params: CollisionResolutionParams
) => void;

export type CollisionHandlerRegistry = Record<
  CollisionPhase,
  Partial<Record<CollisionInteraction, CollisionHandler>>
>;
