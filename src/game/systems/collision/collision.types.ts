import type { Body } from 'check2d';

import type { CollisionKind, CollisionPhase } from './collision.enums';

export type CollisionParticipant = {
  id: string;
  kind: CollisionKind;
};

export type GameBody = Body<CollisionParticipant>;

export type ColliderTransform = {
  angle?: number;
  x: number;
  y: number;
};

export type CollisionPair = {
  a: CollisionParticipant;
  b: CollisionParticipant;
};

export type CollisionEvent = CollisionPair & {
  phase: CollisionPhase;
};
