import type { Body } from 'check2d';

import type { AsteroidSize } from '@/game/entities/asteroid/asteroid.enums';
import type {
  Consumable,
  ContactDamageSource,
  Damageable,
  Flashable,
  PositionedEntity,
  ProjectileDamageSource,
  SizedEntity,
} from '@/game/systems/combat';

import { CollisionKind } from './collision.enums';
import type { CollisionPhase } from './collision.enums';

export type CollisionParticipant =
  | {
      actor: Damageable &
        Flashable &
        ContactDamageSource &
        PositionedEntity &
        SizedEntity<AsteroidSize>;
      id: string;
      kind: typeof CollisionKind.Asteroid;
    }
  | {
      actor: Consumable & PositionedEntity & ProjectileDamageSource;
      id: string;
      kind: typeof CollisionKind.Bullet;
    }
  | {
      id: string;
      kind: typeof CollisionKind.BlackHole;
    }
  | {
      id: string;
      kind: typeof CollisionKind.Spaceship;
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
