import type { BackgroundTextures } from '@/game/assets';
import { GAME_SCALE } from '@/game/constants';

type BackgroundLayerConfig = {
  alpha: number;
  parallax: number;
  texture: keyof BackgroundTextures;
};

export const BACKGROUND_LAYERS = [
  { alpha: 1, parallax: 0, texture: 'starfieldBase' },
  { alpha: 1, parallax: 0, texture: 'nebula' },
  { alpha: 1, parallax: 0.3, texture: 'starsDistant' },
  { alpha: 1, parallax: 0.5, texture: 'planetDust' },
  { alpha: 0.35, parallax: 1, texture: 'starsNear' },
] as const satisfies readonly BackgroundLayerConfig[];

export const BACKGROUND_DRIFT_PIXELS_PER_SECOND = {
  x: 1.5 * GAME_SCALE,
  y: 0.35 * GAME_SCALE,
} as const;

export const BACKGROUND_TILE_SCALE = {
  x: GAME_SCALE,
  y: GAME_SCALE,
} as const;

export const BACKGROUND_SCRIM_ALPHA = 0.45;
export const BACKGROUND_SCRIM_COLOR = 0x06010c;
