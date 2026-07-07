import { useMemo, useRef } from 'react';

import { usePlayerControls } from '@/game/systems';

import { GameContext } from './GameContext';
import type {
  GameContextValue,
  GameProviderProps,
  SpaceshipLocation,
} from './gameContext.types';

function createInitialSpaceshipLocation(): SpaceshipLocation {
  return {
    x: 0,
    y: 0,
    rotation: 0,
  };
}

export function GameProvider({ children }: GameProviderProps) {
  const controlsRef = usePlayerControls();
  const spaceshipLocationRef = useRef<SpaceshipLocation>(
    createInitialSpaceshipLocation()
  );

  const gameContextValue = useMemo<GameContextValue>(
    () => ({
      controlsRef,
      spaceshipLocationRef,
    }),
    [controlsRef, spaceshipLocationRef]
  );

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
}
