import { useCallback, useRef } from 'react';
import type { RefObject } from 'react';

import { useTick } from '@pixi/react';

import type { Sprite, Ticker } from 'pixi.js';

import { useGameContext } from '@/game/context';
import { OneShotEffectKind } from '@/game/effects';
import { SPACESHIP_DEATH_DURATION_MS } from '@/game/entities/spaceship/constants';
import {
  applyHullEffect,
  getSpaceshipEffect,
  resetHullEffect,
} from '@/game/entities/spaceship/utils';
import { GAME_TICK_PRIORITY } from '@/game/systems';
import { GamePhase, useAppStore } from '@/store';

export function useSpaceshipEffects(hullRef: RefObject<Sprite | null>) {
  const { gameTimeMsRef, playOneShotEffect, spaceshipLocationRef } =
    useGameContext();
  const deathElapsedMsRef = useRef<number | null>(null);

  const resetDeathEffect = useCallback(() => {
    deathElapsedMsRef.current = null;
  }, []);

  const updateDeathEffect = useCallback(
    (ticker: Ticker) => {
      if (deathElapsedMsRef.current === null) {
        const { x, y } = spaceshipLocationRef.current;

        playOneShotEffect({
          kind: OneShotEffectKind.ShipExplosion,
          position: { x, y },
        });

        deathElapsedMsRef.current = 0;
      }

      deathElapsedMsRef.current += ticker.deltaMS;

      if (deathElapsedMsRef.current >= SPACESHIP_DEATH_DURATION_MS) {
        useAppStore.getState().endGame();
      }
    },
    [playOneShotEffect, spaceshipLocationRef]
  );

  const updateEffects = useCallback(
    (ticker: Ticker) => {
      const hull = hullRef.current;
      const { gamePhase, playerHp, playerInvincibleUntilGameTimeMs } =
        useAppStore.getState();

      if (playerHp <= 0) {
        if (hull) {
          resetHullEffect(hull);
        }

        if (gamePhase === GamePhase.Dying) {
          updateDeathEffect(ticker);
        } else {
          resetDeathEffect();
        }

        return;
      }

      resetDeathEffect();

      if (!hull) {
        return;
      }

      if (gamePhase !== GamePhase.Running && gamePhase !== GamePhase.Paused) {
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
    },
    [gameTimeMsRef, hullRef, resetDeathEffect, updateDeathEffect]
  );

  useTick({
    callback: updateEffects,
    priority: GAME_TICK_PRIORITY.EffectUpdate,
  });
}
