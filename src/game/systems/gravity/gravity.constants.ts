import { GAME_SCALE } from '@/game/constants';
import { BLACK_HOLE_HITBOX_RADIUS } from '@/game/entities/black-hole/blackHole.constants';
import { BlackHolePhase } from '@/game/entities/black-hole/blackHole.enums';
import type { Vector2 } from '@/game/utils';

import type { GravityProfile } from './gravity.types';

const BLACK_HOLE_GRAVITY_INFLUENCE_RADIUS = 44 * GAME_SCALE;

const BLACK_HOLE_ACTIVE_GRAVITY_STRENGTH = 0.5 * GAME_SCALE ** 3;

const BLACK_HOLE_DANGER_GRAVITY_STRENGTH = 0.9 * GAME_SCALE ** 3;

export const MIN_GRAVITY_DISTANCE_SQUARED =
  BLACK_HOLE_HITBOX_RADIUS * BLACK_HOLE_HITBOX_RADIUS;

export const ZERO_GRAVITY_ACCELERATION = {
  x: 0,
  y: 0,
} as const satisfies Readonly<Vector2>;

export const BLACK_HOLE_GRAVITY_PROFILE_BY_PHASE = {
  [BlackHolePhase.Spawn]: null,
  [BlackHolePhase.Idle]: null,
  [BlackHolePhase.Active]: {
    influenceRadius: BLACK_HOLE_GRAVITY_INFLUENCE_RADIUS,
    strength: BLACK_HOLE_ACTIVE_GRAVITY_STRENGTH,
  },
  [BlackHolePhase.Danger]: {
    influenceRadius: BLACK_HOLE_GRAVITY_INFLUENCE_RADIUS,
    strength: BLACK_HOLE_DANGER_GRAVITY_STRENGTH,
  },
  [BlackHolePhase.Collapse]: null,
} as const satisfies Record<BlackHolePhase, GravityProfile | null>;
