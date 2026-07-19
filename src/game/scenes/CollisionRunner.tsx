import { useCallback } from 'react';

import { useTick } from '@pixi/react';

import { useGameContext } from '@/game/context';
import { GameTickPriority, resolveCollisionEvent } from '@/game/systems';

export function CollisionRunner() {
  const { collisionWorldRef } = useGameContext();

  const updateCollisions = useCallback(() => {
    const collisionEvents = collisionWorldRef.current.checkAll();

    collisionEvents.forEach(resolveCollisionEvent);
  }, [collisionWorldRef]);

  useTick({
    callback: updateCollisions,
    priority: GameTickPriority.CollisionResolution,
  });

  return null;
}
