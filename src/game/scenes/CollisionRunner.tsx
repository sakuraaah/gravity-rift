import { useCallback } from 'react';

import { useTick } from '@pixi/react';

import { useGameContext } from '@/game/context';
import { GAME_TICK_PRIORITY, resolveCollisionEvent } from '@/game/systems';
import { GamePhase, useGameStore } from '@/store';

export function CollisionRunner() {
  const { collisionWorldRef, gameTimeMsRef, playOneShotEffect } =
    useGameContext();

  const updateCollisions = useCallback(() => {
    if (useGameStore.getState().gamePhase !== GamePhase.Running) {
      return;
    }

    const collisionEvents = collisionWorldRef.current.checkAll();
    const collisionResolutionParams = {
      gameTimeMs: gameTimeMsRef.current,
      playOneShotEffect,
    };

    collisionEvents.forEach((collision) => {
      resolveCollisionEvent(collision, collisionResolutionParams);
    });
  }, [collisionWorldRef, gameTimeMsRef, playOneShotEffect]);

  useTick({
    callback: updateCollisions,
    priority: GAME_TICK_PRIORITY.CollisionResolution,
  });

  return null;
}
