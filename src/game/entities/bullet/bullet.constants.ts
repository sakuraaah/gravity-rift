import { GAME_SCALE } from '@/game/constants';
import type { Vector2 } from '@/game/utils';

export const BULLET_RADIUS = 1 * GAME_SCALE;

export const BULLET_HITBOX_RADIUS = BULLET_RADIUS * 1.5;

export const BULLET_COLOR = 0x4fd6ff;

export const BULLET_FIRE_INTERVAL_MS = 500;

export const BULLET_BASE_MOVEMENT_SPEED = 1 * GAME_SCALE;

export const BULLET_DESPAWN_MARGIN = BULLET_RADIUS * 2;

export const BULLET_TRAIL_POINT_COUNT = 7;

export const BULLET_TRAIL_POINT_SPACING = 2 * GAME_SCALE;

export const BULLET_TRAIL_FADE_DURATION_MS = 120;

export const BULLET_INITIAL_LOCATION = {
  x: 0,
  y: 0,
};

export const BULLET_SPAWN_OFFSET_BY_FACING_INDEX = [
  { x: -1 * GAME_SCALE, y: -6 * GAME_SCALE },
  { x: 2 * GAME_SCALE, y: -6 * GAME_SCALE },
  { x: 4 * GAME_SCALE, y: -5 * GAME_SCALE },
  { x: 5 * GAME_SCALE, y: -3 * GAME_SCALE },
  { x: 5 * GAME_SCALE, y: -1 * GAME_SCALE },
  { x: 5 * GAME_SCALE, y: 2 * GAME_SCALE },
  { x: 4 * GAME_SCALE, y: 4 * GAME_SCALE },
  { x: 2 * GAME_SCALE, y: 5 * GAME_SCALE },
  { x: 0, y: 5 * GAME_SCALE },
  { x: -3 * GAME_SCALE, y: 5 * GAME_SCALE },
  { x: -5 * GAME_SCALE, y: 4 * GAME_SCALE },
  { x: -6 * GAME_SCALE, y: 2 * GAME_SCALE },
  { x: -6 * GAME_SCALE, y: 0 },
  { x: -6 * GAME_SCALE, y: -3 * GAME_SCALE },
  { x: -5 * GAME_SCALE, y: -5 * GAME_SCALE },
  { x: -3 * GAME_SCALE, y: -6 * GAME_SCALE },
] as const satisfies ReadonlyArray<Readonly<Vector2>>;
