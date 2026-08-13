import { GAME_SCALE } from '@/game/constants';

const BLACK_HOLE_BASE_FRAME_SIZE = 32;

export const BLACK_HOLE_FRAME_SIZE = BLACK_HOLE_BASE_FRAME_SIZE * GAME_SCALE;

export const BLACK_HOLE_FRAME_RADIUS = BLACK_HOLE_FRAME_SIZE / 2;

export const BLACK_HOLE_ANIMATION_FPS = 10;

export const BLACK_HOLE_INITIAL_SPAWN = {
  location: { x: 24, y: 24 },
} as const;
