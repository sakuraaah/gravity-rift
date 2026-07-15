import { useCallback, useMemo, useRef } from 'react';

import {
  CollisionWorld,
  createInitialGameSpeed,
  updateGameSpeed as updateGameSpeedValue,
  usePlayerControls,
} from '@/game/systems';

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
  const gameSpeedRef = useRef(createInitialGameSpeed());
  const spaceshipLocationRef = useRef<SpaceshipLocation>(
    createInitialSpaceshipLocation()
  );
  const updateGameSpeed = useCallback((newSpeed: number) => {
    updateGameSpeedValue(gameSpeedRef.current, newSpeed);
  }, []);

  const gameContextValue = useMemo<GameContextValue>(
    () => ({
      collisionWorldRef,
      controlsRef,
      gameSpeedRef,
      updateGameSpeed,
      spaceshipLocationRef,
    }),
    [
      collisionWorldRef,
      controlsRef,
      gameSpeedRef,
      spaceshipLocationRef,
      updateGameSpeed,
    ]
  );

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
}
