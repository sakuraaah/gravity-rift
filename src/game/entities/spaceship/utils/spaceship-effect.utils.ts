import type { Sprite } from 'pixi.js';

import {
  SPACESHIP_BLINK_DIM_ALPHA,
  SPACESHIP_DEFAULT_ALPHA,
  SPACESHIP_DEFAULT_TINT,
  SPACESHIP_EFFECT_DURATION_MS,
  SPACESHIP_FLASH_TINT,
} from '@/game/entities/spaceship/constants';
import { SpaceshipEffect } from '@/game/entities/spaceship/spaceship.enums';
import {
  PLAYER_INVINCIBILITY_DURATION_MS,
  PLAYER_INVINCIBILITY_FAST_BLINK_DURATION_MS,
} from '@/store';

function getEffectElapsedMs(
  effect: SpaceshipEffect,
  remainingInvincibilityMs: number
) {
  if (effect === SpaceshipEffect.FastBlink) {
    return (
      PLAYER_INVINCIBILITY_FAST_BLINK_DURATION_MS - remainingInvincibilityMs
    );
  }

  return (
    PLAYER_INVINCIBILITY_DURATION_MS -
    remainingInvincibilityMs -
    SPACESHIP_EFFECT_DURATION_MS[SpaceshipEffect.Flash]
  );
}

function getBlinkAlpha(effect: SpaceshipEffect, effectElapsedMs: number) {
  const cycleDurationMs = SPACESHIP_EFFECT_DURATION_MS[effect];
  const cycleElapsedMs = effectElapsedMs % cycleDurationMs;
  const isDimmed = cycleElapsedMs >= cycleDurationMs / 2;

  return isDimmed ? SPACESHIP_BLINK_DIM_ALPHA : SPACESHIP_DEFAULT_ALPHA;
}

export function getSpaceshipEffect(
  remainingInvincibilityMs: number
): SpaceshipEffect | null {
  if (
    remainingInvincibilityMs <= 0 ||
    remainingInvincibilityMs > PLAYER_INVINCIBILITY_DURATION_MS
  ) {
    return null;
  }

  const elapsedInvincibilityMs =
    PLAYER_INVINCIBILITY_DURATION_MS - remainingInvincibilityMs;

  if (
    elapsedInvincibilityMs < SPACESHIP_EFFECT_DURATION_MS[SpaceshipEffect.Flash]
  ) {
    return SpaceshipEffect.Flash;
  }

  if (remainingInvincibilityMs <= PLAYER_INVINCIBILITY_FAST_BLINK_DURATION_MS) {
    return SpaceshipEffect.FastBlink;
  }

  return SpaceshipEffect.Blink;
}

export function resetHullEffect(hull: Sprite) {
  hull.alpha = SPACESHIP_DEFAULT_ALPHA;
  hull.tint = SPACESHIP_DEFAULT_TINT;
}

export function applyHullEffect(
  hull: Sprite,
  effect: SpaceshipEffect,
  remainingInvincibilityMs: number
) {
  if (effect === SpaceshipEffect.Flash) {
    hull.alpha = SPACESHIP_DEFAULT_ALPHA;
    hull.tint = SPACESHIP_FLASH_TINT;
    return;
  }

  const effectElapsedMs = getEffectElapsedMs(effect, remainingInvincibilityMs);

  hull.alpha = getBlinkAlpha(effect, effectElapsedMs);
  hull.tint = SPACESHIP_DEFAULT_TINT;
}
