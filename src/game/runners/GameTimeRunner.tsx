import { useCallback } from 'react';

import { useTick } from '@pixi/react';

import type { Ticker } from 'pixi.js';

import { useGameContext } from '@/game/context';
import { GAME_TICK_PRIORITY } from '@/game/systems';
import { GamePhase, useAppStore } from '@/store';

export function GameTimeRunner() {
  const { gameTimeMsRef } = useGameContext();

  const updateGameTime = useCallback(
    (ticker: Ticker) => {
      if (useAppStore.getState().gamePhase !== GamePhase.Running) {
        return;
      }

      gameTimeMsRef.current += ticker.deltaMS;
    },
    [gameTimeMsRef]
  );

  useTick({
    callback: updateGameTime,
    priority: GAME_TICK_PRIORITY.GameTimeUpdate,
  });

  return null;
}
