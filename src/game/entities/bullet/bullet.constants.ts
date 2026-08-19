import { GAME_SCALE } from '@/game/constants';

export const BULLET_RADIUS = 1 * GAME_SCALE;

export const BULLET_HITBOX_RADIUS = BULLET_RADIUS * 1.5;

export const BULLET_COLOR = 0x4fd6ff;

export const BULLET_FIRE_DEBOUNCE_MS = 500;

export const BULLET_BASE_MOVEMENT_SPEED = 1 * GAME_SCALE;

export const BULLET_DESPAWN_MARGIN = BULLET_RADIUS * 2;

export const BULLET_TRAIL_POINT_COUNT = 7;

export const BULLET_TRAIL_POINT_SPACING = 2 * GAME_SCALE;

export const BULLET_TRAIL_FADE_DURATION_MS = 120;

export const BULLET_INITIAL_LOCATION = {
  x: 0,
  y: 0,
  rotation: 0,
};
