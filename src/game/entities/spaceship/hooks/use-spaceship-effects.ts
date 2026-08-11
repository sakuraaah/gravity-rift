import { useCallback } from 'react';
import type { RefObject } from 'react';

import { useTick } from '@pixi/react';

import type { Sprite } from 'pixi.js';

import { useGameContext } from '@/game/context';
import {
  applyHullEffect,
  getSpaceshipEffect,
  resetHullEffect,
} from '@/game/entities/spaceship/utils';
import { GAME_TICK_PRIORITY } from '@/game/systems';
import { GamePhase, useAppStore } from '@/store';

export function useSpaceshipEffects(hullRef: RefObject<Sprite | null>) {
  const { gameTimeMsRef } = useGameContext();

  const updateEffects = useCallback(() => {
    const hull = hullRef.current;

    if (!hull) {
      return;
    }

    const { gamePhase, playerHp, playerInvincibleUntilGameTimeMs } =
      useAppStore.getState();

    if (
      playerHp <= 0 ||
      (gamePhase !== GamePhase.Running && gamePhase !== GamePhase.Paused)
    ) {
      resetHullEffect(hull);
      return;
    }

    const remainingInvincibilityMs =
      playerInvincibleUntilGameTimeMs - gameTimeMsRef.current;
    const effect = getSpaceshipEffect(remainingInvincibilityMs);

    if (!effect) {
      resetHullEffect(hull);
      return;
    }

    applyHullEffect(hull, effect, remainingInvincibilityMs);
  }, [gameTimeMsRef, hullRef]);

  useTick({
    callback: updateEffects,
    priority: GAME_TICK_PRIORITY.EffectUpdate,
  });
}
