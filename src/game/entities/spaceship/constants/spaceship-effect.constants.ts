import { SpaceshipEffect } from '@/game/entities/spaceship/spaceship.enums';

export const SPACESHIP_EFFECT_DURATION_MS = {
  [SpaceshipEffect.Blink]: 300,
  [SpaceshipEffect.FastBlink]: 150,
  [SpaceshipEffect.Flash]: 125,
} as const satisfies Record<SpaceshipEffect, number>;

export const SPACESHIP_BLINK_DIM_ALPHA = 0.4;

export const SPACESHIP_DEFAULT_ALPHA = 1;

export const SPACESHIP_DEFAULT_TINT = 0xffffff;

export const SPACESHIP_FLASH_TINT = 0xff5c7a;
