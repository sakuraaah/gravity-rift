import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Pool, Ticker } from 'pixi.js';
import { Pool as PixiPool } from 'pixi.js';

import { GAME_LAYOUT } from '@/game/constants';
import { useGameContext } from '@/game/context';
import {
  ASTEROID_SPAWN_CONFIG_BY_SIZE,
  ASTEROID_SPAWN_SIZES,
  GAME_TICK_PRIORITY,
  createAsteroidSpawnData,
  sampleNextAsteroidSpawnDelayMs,
} from '@/game/systems';
import { GamePhase, useGameStore } from '@/store';

import { Asteroid } from './Asteroid';
import { ASTEROID_DESPAWN_MARGIN } from './asteroid.constants';
import type { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

function createInitialSpawnDelays(): Record<AsteroidSize, number> {
  return ASTEROID_SPAWN_SIZES.reduce(
    (spawnDelays, size) => {
      spawnDelays[size] = ASTEROID_SPAWN_CONFIG_BY_SIZE[size].initialDelayMs;
      return spawnDelays;
    },
    {} as Record<AsteroidSize, number>
  );
}

function getActiveAsteroidLocations(asteroids: Asteroid[]) {
  return asteroids.map((asteroid) => ({
    x: asteroid.position.x,
    y: asteroid.position.y,
  }));
}

export function AsteroidPool() {
  const { collisionWorldRef } = useGameContext();
  const asteroidLayerRef = useRef<Container>(null);
  const activeAsteroidsRef = useRef<Asteroid[]>([]);
  const spawnDelaysRef = useRef<Record<AsteroidSize, number>>(
    createInitialSpawnDelays()
  );
  const asteroidPool = useMemo<Pool<Asteroid, AsteroidSpawnData>>(
    () => new PixiPool(Asteroid),
    []
  );

  const releaseAsteroid = useCallback(
    (asteroid: Asteroid) => {
      asteroid.unregisterCollider(collisionWorldRef.current);
      asteroidPool.return(asteroid);
    },
    [asteroidPool, collisionWorldRef]
  );

  const spawnAsteroid = useCallback(
    (spawnData: AsteroidSpawnData) => {
      const asteroidLayer = asteroidLayerRef.current;

      if (!asteroidLayer) {
        return false;
      }

      const asteroid = asteroidPool.get(spawnData);
      const collisionWorld = collisionWorldRef.current;

      asteroid.registerCollider(collisionWorld);
      asteroidLayer.addChild(asteroid);
      activeAsteroidsRef.current.push(asteroid);

      return true;
    },
    [asteroidPool, collisionWorldRef]
  );

  const updateAsteroids = useCallback(
    (ticker: Ticker) => {
      const { gamePhase, gameSpeedMultiplier } = useGameStore.getState();

      if (gamePhase !== GamePhase.Running) {
        return;
      }

      ASTEROID_SPAWN_SIZES.forEach((size) => {
        const nextDelay = spawnDelaysRef.current[size] - ticker.deltaMS;

        if (nextDelay > 0) {
          spawnDelaysRef.current[size] = nextDelay;
          return;
        }

        // Each size has its own loose schedule, so a small asteroid can appear
        // often while large ones still feel like a heavier event.
        const spawnSuccess = spawnAsteroid(
          createAsteroidSpawnData({
            bounds: {
              height: GAME_LAYOUT.Height,
              width: GAME_LAYOUT.Width,
            },
            margin: ASTEROID_DESPAWN_MARGIN,
            occupiedLocations: getActiveAsteroidLocations(
              activeAsteroidsRef.current
            ),
            size,
            target: {
              x: GAME_LAYOUT.Width / 2,
              y: GAME_LAYOUT.Height / 2,
            },
          })
        );

        spawnDelaysRef.current[size] = spawnSuccess
          ? sampleNextAsteroidSpawnDelayMs(size)
          : 0;
      });

      for (
        let index = activeAsteroidsRef.current.length - 1;
        index >= 0;
        index -= 1
      ) {
        const asteroid = activeAsteroidsRef.current[index];

        asteroid.update(ticker.deltaTime, gameSpeedMultiplier);

        if (
          asteroid.isOutsideBounds(
            GAME_LAYOUT.Width,
            GAME_LAYOUT.Height,
            ASTEROID_DESPAWN_MARGIN
          )
        ) {
          releaseAsteroid(asteroid);
          activeAsteroidsRef.current.splice(index, 1);
          continue;
        }

        asteroid.syncCollider(collisionWorldRef.current);
      }
    },
    [collisionWorldRef, releaseAsteroid, spawnAsteroid]
  );

  const cleanupInactiveAsteroids = useCallback(() => {
    for (
      let index = activeAsteroidsRef.current.length - 1;
      index >= 0;
      index -= 1
    ) {
      const asteroid = activeAsteroidsRef.current[index];

      if (asteroid.isActive) {
        continue;
      }

      releaseAsteroid(asteroid);
      activeAsteroidsRef.current.splice(index, 1);
    }
  }, [releaseAsteroid]);

  useEffect(() => {
    return () => {
      activeAsteroidsRef.current.forEach((asteroid) => {
        releaseAsteroid(asteroid);
      });
      activeAsteroidsRef.current = [];

      asteroidPool.clear();
    };
  }, [asteroidPool, releaseAsteroid]);

  useTick({
    callback: updateAsteroids,
    priority: GAME_TICK_PRIORITY.EntityUpdate,
  });

  useTick({
    callback: cleanupInactiveAsteroids,
    priority: GAME_TICK_PRIORITY.EntityCleanup,
  });

  return <pixiContainer ref={asteroidLayerRef} label="asteroid-layer" />;
}
