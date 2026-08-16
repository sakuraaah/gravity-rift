import { GAME_SCALE } from '@/game/constants';

import { BlackHoleAnimation, BlackHolePhase } from './blackHole.enums';

const BLACK_HOLE_BASE_FRAME_SIZE = 32;

export const BLACK_HOLE_FRAME_SIZE = BLACK_HOLE_BASE_FRAME_SIZE * GAME_SCALE;

export const BLACK_HOLE_FRAME_RADIUS = BLACK_HOLE_FRAME_SIZE / 2;

export const BLACK_HOLE_HITBOX_RADIUS = 3.5 * GAME_SCALE;

export const BLACK_HOLE_ANIMATION_FPS = 6;

export const BLACK_HOLE_INITIAL_SPAWN = {
  location: { x: 24, y: 24 },
} as const;

export const BLACK_HOLE_PHASE_BY_ANIMATION = {
  [BlackHoleAnimation.Spawn]: BlackHolePhase.Spawn,
  [BlackHoleAnimation.SpawnToIdleA]: BlackHolePhase.Spawn,
  [BlackHoleAnimation.SpawnToIdleB]: BlackHolePhase.Spawn,
  [BlackHoleAnimation.Idle]: BlackHolePhase.Idle,
  [BlackHoleAnimation.IdleToActiveA]: BlackHolePhase.Idle,
  [BlackHoleAnimation.IdleToActiveB]: BlackHolePhase.Idle,
  [BlackHoleAnimation.Active]: BlackHolePhase.Active,
  [BlackHoleAnimation.ActiveToDangerA]: BlackHolePhase.Active,
  [BlackHoleAnimation.ActiveToDangerB]: BlackHolePhase.Active,
  [BlackHoleAnimation.Danger]: BlackHolePhase.Danger,
  [BlackHoleAnimation.IdleToCollapseA]: BlackHolePhase.Idle,
  [BlackHoleAnimation.IdleToCollapseB]: BlackHolePhase.Idle,
  [BlackHoleAnimation.Collapse]: BlackHolePhase.Collapse,
} as const satisfies Record<BlackHoleAnimation, BlackHolePhase>;
