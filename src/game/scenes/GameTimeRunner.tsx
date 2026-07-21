import { useCallback } from 'react';

import { useTick } from '@pixi/react';

import type { Ticker } from 'pixi.js';

import { useGameContext } from '@/game/context';
import { GameTickPriority } from '@/game/systems';
import { GamePhase, useGameStore } from '@/store';

export function GameTimeRunner() {
  const { gameTimeMsRef } = useGameContext();

  const updateGameTime = useCallback(
    (ticker: Ticker) => {
      if (useGameStore.getState().gamePhase !== GamePhase.Running) {
        return;
      }

      gameTimeMsRef.current += ticker.deltaMS;
    },
    [gameTimeMsRef]
  );

  useTick({
    callback: updateGameTime,
    priority: GameTickPriority.GameTimeUpdate,
  });

  return null;
}
