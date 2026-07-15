import { useCallback } from 'react';

import { useTick } from '@pixi/react';

import { UPDATE_PRIORITY } from 'pixi.js';

import { useGameContext } from '@/game/context';
import { resolveCollisionEvent } from '@/game/systems';

const COLLISION_TICK_PRIORITY = UPDATE_PRIORITY.LOW + 1;

export function CollisionRunner() {
  const { collisionWorldRef } = useGameContext();

  const updateCollisions = useCallback(() => {
    const collisionEvents = collisionWorldRef.current.checkAll();

    collisionEvents.forEach(resolveCollisionEvent);
  }, [collisionWorldRef]);

  useTick({
    callback: updateCollisions,
    priority: COLLISION_TICK_PRIORITY,
  });

  return null;
}
