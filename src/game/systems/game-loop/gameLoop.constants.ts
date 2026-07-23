import { UPDATE_PRIORITY } from 'pixi.js';

// higher priorities run first
export const GameTickPriority = {
  GameTimeUpdate: UPDATE_PRIORITY.HIGH,
  EntityUpdate: UPDATE_PRIORITY.NORMAL,
  CollisionResolution: UPDATE_PRIORITY.LOW + 10,
  EffectUpdate: UPDATE_PRIORITY.LOW + 8,
  EntityCleanup: UPDATE_PRIORITY.LOW + 5,
} as const;
