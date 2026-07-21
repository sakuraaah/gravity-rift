import { useCallback } from 'react';

import { useTick } from '@pixi/react';

import { useGameContext } from '@/game/context';
import { GameTickPriority, resolveCollisionEvent } from '@/game/systems';
import { GamePhase, useGameStore } from '@/store';

export function CollisionRunner() {
  const { collisionWorldRef, gameTimeMsRef } = useGameContext();

  const updateCollisions = useCallback(() => {
    if (useGameStore.getState().gamePhase !== GamePhase.Running) {
      return;
    }

    const collisionEvents = collisionWorldRef.current.checkAll();
    const collisionResolutionParams = {
      gameTimeMs: gameTimeMsRef.current,
    };

    collisionEvents.forEach((collision) => {
      resolveCollisionEvent(collision, collisionResolutionParams);
    });
  }, [collisionWorldRef, gameTimeMsRef]);

  useTick({
    callback: updateCollisions,
    priority: GameTickPriority.CollisionResolution,
  });

  return null;
}
