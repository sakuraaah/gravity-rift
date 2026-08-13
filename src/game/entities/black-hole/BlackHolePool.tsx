import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Pool, Ticker } from 'pixi.js';
import { Pool as PixiPool } from 'pixi.js';

import { GAME_LAYOUT } from '@/game/constants';
import {
  BLACK_HOLE_MAX_ACTIVE_COUNT,
  GAME_TICK_PRIORITY,
  createBlackHoleSpawnData,
  sampleNextBlackHoleSpawnDelayMs,
} from '@/game/systems';
import { GamePhase, useAppStore } from '@/store';

import { BlackHole } from './BlackHole';
import type { BlackHoleSpawnData } from './blackHole.types';

function getActiveBlackHoleLocations(blackHoles: BlackHole[]) {
  return blackHoles.map((blackHole) => ({
    x: blackHole.position.x,
    y: blackHole.position.y,
  }));
}

export function BlackHolePool() {
  const blackHoleLayerRef = useRef<Container>(null);
  const activeBlackHolesRef = useRef<BlackHole[]>([]);
  const blockedSpawnActiveCountRef = useRef<number | null>(null);
  const nextSpawnDelayMsRef = useRef(sampleNextBlackHoleSpawnDelayMs());
  const blackHolePool = useMemo<Pool<BlackHole, BlackHoleSpawnData>>(
    () => new PixiPool(BlackHole),
    []
  );

  const releaseBlackHole = useCallback(
    (blackHole: BlackHole) => {
      blackHolePool.return(blackHole);
    },
    [blackHolePool]
  );

  const spawnBlackHole = useCallback(
    (spawnData: BlackHoleSpawnData) => {
      const blackHoleLayer = blackHoleLayerRef.current;

      if (!blackHoleLayer) {
        return false;
      }

      const blackHole = blackHolePool.get(spawnData);

      blackHoleLayer.addChild(blackHole);
      activeBlackHolesRef.current.push(blackHole);

      return true;
    },
    [blackHolePool]
  );

  const updateBlackHoles = useCallback(
    (ticker: Ticker) => {
      if (useAppStore.getState().gamePhase !== GamePhase.Running) {
        return;
      }

      activeBlackHolesRef.current.forEach((blackHole) => {
        blackHole.update(ticker);
      });

      const activeBlackHoleCount = activeBlackHolesRef.current.length;

      if (activeBlackHoleCount >= BLACK_HOLE_MAX_ACTIVE_COUNT) {
        return;
      }

      if (blockedSpawnActiveCountRef.current === activeBlackHoleCount) {
        return;
      }

      blockedSpawnActiveCountRef.current = null;

      const nextDelay = nextSpawnDelayMsRef.current - ticker.deltaMS;

      if (nextDelay > 0) {
        nextSpawnDelayMsRef.current = nextDelay;
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

      if (!spawnBlackHole(spawnData)) {
        return;
      }

      nextSpawnDelayMsRef.current = sampleNextBlackHoleSpawnDelayMs();
    },
    [spawnBlackHole]
  );

  useEffect(() => {
    return () => {
      activeBlackHolesRef.current.forEach(releaseBlackHole);
      activeBlackHolesRef.current = [];
      blackHolePool.clear();
    };
  }, [blackHolePool, releaseBlackHole]);

  useTick({
    callback: updateBlackHoles,
    priority: GAME_TICK_PRIORITY.EntityUpdate,
  });

  return <pixiContainer ref={blackHoleLayerRef} label="black-hole-layer" />;
}
