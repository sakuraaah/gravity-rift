import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Pool, Ticker } from 'pixi.js';
import { Pool as PixiPool } from 'pixi.js';

import { GAME_LAYOUT } from '@/game/constants';
import { useGameContext } from '@/game/context';
import {
  BLACK_HOLE_MAX_ACTIVE_COUNT,
  GAME_TICK_PRIORITY,
  createBlackHoleSpawnData,
  sampleNextBlackHoleSpawnDelayMs,
} from '@/game/systems';
import { GamePhase, useAppStore } from '@/store';

import { BlackHole } from './BlackHole';
import type { BlackHoleInitData, BlackHoleSpawnData } from './blackHole.types';

function getActiveBlackHoleLocations(blackHoles: BlackHole[]) {
  return blackHoles.map((blackHole) => ({
    x: blackHole.position.x,
    y: blackHole.position.y,
  }));
}

export function BlackHolePool() {
  const { activeBlackHolesRef, collisionWorldRef, gameTimeMsRef } =
    useGameContext();
  const blackHoleLayerRef = useRef<Container>(null);
  const blockedSpawnActiveCountRef = useRef<number | null>(null);
  const nextSpawnAtGameTimeMsRef = useRef(
    gameTimeMsRef.current + sampleNextBlackHoleSpawnDelayMs()
  );
  const blackHolePool = useMemo<Pool<BlackHole, BlackHoleInitData>>(
    () => new PixiPool(BlackHole),
    []
  );

  const releaseBlackHole = useCallback(
    (blackHole: BlackHole) => {
      blackHole.unregisterCollider(collisionWorldRef.current);
      blackHolePool.return(blackHole);
    },
    [blackHolePool, collisionWorldRef]
  );

  const spawnBlackHole = useCallback(
    (spawnData: BlackHoleSpawnData, gameTimeMs: number) => {
      const blackHoleLayer = blackHoleLayerRef.current;

      if (!blackHoleLayer) {
        return false;
      }

      const blackHole = blackHolePool.get({
        ...spawnData,
        gameTimeMs,
      });

      blackHoleLayer.addChild(blackHole);
      activeBlackHolesRef.current.push(blackHole);

      return true;
    },
    [activeBlackHolesRef, blackHolePool]
  );

  const updateBlackHoles = useCallback(
    (ticker: Ticker) => {
      if (useAppStore.getState().gamePhase !== GamePhase.Running) {
        return;
      }

      const gameTimeMs = gameTimeMsRef.current;

      for (
        let index = activeBlackHolesRef.current.length - 1;
        index >= 0;
        index -= 1
      ) {
        const blackHole = activeBlackHolesRef.current[index];

        blackHole.update(ticker);
        blackHole.updateLifecycle(gameTimeMs);
        blackHole.syncCollider(collisionWorldRef.current);

        if (!blackHole.isLifecycleComplete) {
          continue;
        }

        activeBlackHolesRef.current.splice(index, 1);
        releaseBlackHole(blackHole);
      }

      const activeBlackHoleCount = activeBlackHolesRef.current.length;

      if (activeBlackHoleCount >= BLACK_HOLE_MAX_ACTIVE_COUNT) {
        return;
      }

      if (blockedSpawnActiveCountRef.current === activeBlackHoleCount) {
        return;
      }

      blockedSpawnActiveCountRef.current = null;

      if (gameTimeMs < nextSpawnAtGameTimeMsRef.current) {
        return;
      }

      const spawnData = createBlackHoleSpawnData({
        bounds: {
          height: GAME_LAYOUT.Height,
          width: GAME_LAYOUT.Width,
        },
        occupiedLocations: getActiveBlackHoleLocations(
          activeBlackHolesRef.current
        ),
      });

      if (!spawnData) {
        blockedSpawnActiveCountRef.current = activeBlackHoleCount;
        return;
      }

      if (!spawnBlackHole(spawnData, gameTimeMs)) {
        return;
      }

      nextSpawnAtGameTimeMsRef.current =
        gameTimeMs + sampleNextBlackHoleSpawnDelayMs();
    },
    [
      activeBlackHolesRef,
      collisionWorldRef,
      gameTimeMsRef,
      releaseBlackHole,
      spawnBlackHole,
    ]
  );

  useEffect(() => {
    return () => {
      activeBlackHolesRef.current.forEach(releaseBlackHole);
      activeBlackHolesRef.current = [];
      blackHolePool.clear();
    };
  }, [activeBlackHolesRef, blackHolePool, releaseBlackHole]);

  useTick({
    callback: updateBlackHoles,
    priority: GAME_TICK_PRIORITY.BlackHoleUpdate,
  });

  return <pixiContainer ref={blackHoleLayerRef} label="black-hole-layer" />;
}
