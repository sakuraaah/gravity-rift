import { GAME_SCALE } from './game.constants';

export const GAME_LAYOUT = {
  Height: 135 * GAME_SCALE,
  Width: 240 * GAME_SCALE,
} as const;

export const LAYOUT_SCALE = 4;

export const RENDER_RESOLUTION = Math.min(2, LAYOUT_SCALE);
