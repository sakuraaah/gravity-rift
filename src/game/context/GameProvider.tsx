import { useCallback, useMemo, useRef } from 'react';

import type { OneShotEffectRequest } from '@/game/effects';
import type { BlackHole } from '@/game/entities';
import { CollisionWorld, usePlayerControls } from '@/game/systems';
import { GamePhase, useAppStore } from '@/store';

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
  };
}

export function GameProvider({ children }: GameProviderProps) {
  const gamePhase = useAppStore((state) => state.gamePhase);
  const activeBlackHolesRef = useRef<BlackHole[]>([]);
  const collisionWorldRef = useRef(new CollisionWorld());
  const controlsRef = usePlayerControls({
    disabled: gamePhase !== GamePhase.Running,
  });
  const gameTimeMsRef = useRef(0);
  const pendingOneShotEffectsRef = useRef<OneShotEffectRequest[]>([]);
  const spaceshipLocationRef = useRef<SpaceshipLocation>(
    createInitialSpaceshipLocation()
  );

  const playOneShotEffect = useCallback((request: OneShotEffectRequest) => {
    pendingOneShotEffectsRef.current.push({
      ...request,
      position: { ...request.position },
    });
  }, []);

  const gameContextValue = useMemo<GameContextValue>(
    () => ({
      activeBlackHolesRef,
      collisionWorldRef,
      controlsRef,
      gameTimeMsRef,
      pendingOneShotEffectsRef,
      playOneShotEffect,
      spaceshipLocationRef,
    }),
    [
      activeBlackHolesRef,
      collisionWorldRef,
      controlsRef,
      gameTimeMsRef,
      pendingOneShotEffectsRef,
      playOneShotEffect,
      spaceshipLocationRef,
    ]
  );

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
}
