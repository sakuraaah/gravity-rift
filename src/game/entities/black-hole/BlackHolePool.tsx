import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Pool, Ticker } from 'pixi.js';
import { Pool as PixiPool } from 'pixi.js';

import { GAME_LAYOUT } from '@/game/constants';
import { GAME_TICK_PRIORITY } from '@/game/systems';
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

      if (activeBlackHolesRef.current.length) {
        return;
      }

      if (!spawnBlackHole({ location: { x: 22, y: 22 } })) {
        return;
      }
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
