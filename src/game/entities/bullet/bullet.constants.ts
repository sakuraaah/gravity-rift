import { GAME_SCALE, GAME_SPEED_MULTIPLIER } from '@/game/constants';

export const BULLET_RADIUS = 1.5 * GAME_SCALE;

export const BULLET_COLOR = 0x4fd6ff;

export const BULLET_FIRE_DEBOUNCE_MS = 250;

export const BULLET_MOVEMENT_SPEED = 2 * GAME_SCALE * GAME_SPEED_MULTIPLIER;

export const BULLET_DESPAWN_MARGIN = BULLET_RADIUS * 2;

export const BULLET_INITIAL_LOCATION = {
  x: 0,
  y: 0,
  rotation: 0,
};
