import { useMemo, useRef } from 'react';

import { CollisionWorld, usePlayerControls } from '@/game/systems';

import { GameContext } from './GameContext';
import type {
  GameContextValue,
  GameProviderProps,
  SpaceshipLocation,
} from './gameContext.types';

function createInitialSpaceshipLocation(): SpaceshipLocation {
  return {
    facingIndex: 0,
    x: 0,
    y: 0,
    rotation: 0,
  };
}

export function GameProvider({ children }: GameProviderProps) {
  const collisionWorldRef = useRef(new CollisionWorld());
  const controlsRef = usePlayerControls();
  const gameTimeMsRef = useRef(0);
  const spaceshipLocationRef = useRef<SpaceshipLocation>(
    createInitialSpaceshipLocation()
  );

  const gameContextValue = useMemo<GameContextValue>(
    () => ({
      collisionWorldRef,
      controlsRef,
      gameTimeMsRef,
      spaceshipLocationRef,
    }),
    [collisionWorldRef, controlsRef, gameTimeMsRef, spaceshipLocationRef]
  );

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
}
