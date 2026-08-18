import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Pool, Ticker } from 'pixi.js';
import { Pool as PixiPool } from 'pixi.js';

import { GAME_LAYOUT } from '@/game/constants';
import { useGameContext } from '@/game/context';
import {
  GAME_TICK_PRIORITY,
  calculateBlackHoleGravityAcceleration,
} from '@/game/systems';
import { GamePhase, useAppStore } from '@/store';

import { Bullet } from './Bullet';
import { BulletTrail } from './BulletTrail';
import {
  BULLET_BASE_MOVEMENT_SPEED,
  BULLET_DESPAWN_MARGIN,
  BULLET_FIRE_DEBOUNCE_MS,
} from './bullet.constants';
import type { BulletSpawnData } from './bullet.types';

type ActiveBullet = {
  bullet: Bullet;
  trail: BulletTrail;
};

export function BulletPool() {
  const {
    activeBlackHolesRef,
    collisionWorldRef,
    controlsRef,
    gameTimeMsRef,
    spaceshipLocationRef,
  } = useGameContext();
  const bulletLayerRef = useRef<Container>(null);
  const trailLayerRef = useRef<Container>(null);
  const activeBulletsRef = useRef<ActiveBullet[]>([]);
  const fadingTrailsRef = useRef<BulletTrail[]>([]);
  const lastBulletFiredAtRef = useRef<number | null>(null);
  const bulletPool = useMemo<Pool<Bullet, BulletSpawnData>>(
    () => new PixiPool(Bullet),
    []
  );
  const trailPool = useMemo<Pool<BulletTrail>>(
    () => new PixiPool(BulletTrail),
    []
  );

  const releaseBullet = useCallback(
    (bullet: Bullet) => {
      bullet.unregisterCollider(collisionWorldRef.current);
      bulletPool.return(bullet);
    },
    [bulletPool, collisionWorldRef]
  );

  const despawnActiveBullet = useCallback(
    (activeBullet: ActiveBullet) => {
      releaseBullet(activeBullet.bullet);
      fadingTrailsRef.current.push(activeBullet.trail);
    },
    [releaseBullet]
  );

  const spawnBullet = useCallback(() => {
    const bulletLayer = bulletLayerRef.current;
    const trailLayer = trailLayerRef.current;

    if (!bulletLayer || !trailLayer) {
      return false;
    }

    const collisionWorld = collisionWorldRef.current;
    const { x, y, rotation } = spaceshipLocationRef.current;
    const velocity = {
      x: Math.sin(rotation) * BULLET_BASE_MOVEMENT_SPEED,
      y: -Math.cos(rotation) * BULLET_BASE_MOVEMENT_SPEED,
    };
    const bullet = bulletPool.get({
      damage: useAppStore.getState().bulletDamage,
      location: {
        x,
        y,
        rotation,
      },
      velocity,
    });
    const trail = trailPool.get(bullet.position);

    bullet.registerCollider(collisionWorld);
    trailLayer.addChild(trail);
    bulletLayer.addChild(bullet);
    activeBulletsRef.current.push({ bullet, trail });

    return true;
  }, [bulletPool, collisionWorldRef, spaceshipLocationRef, trailPool]);

  const updateBullets = useCallback(
    (ticker: Ticker) => {
      const { gamePhase, gameSpeedMultiplier } = useAppStore.getState();

      if (gamePhase !== GamePhase.Running) {
        return;
      }

      for (
        let index = fadingTrailsRef.current.length - 1;
        index >= 0;
        index -= 1
      ) {
        const trail = fadingTrailsRef.current[index];

        if (!trail.fade(ticker.deltaMS)) {
          continue;
        }

        trailPool.return(trail);
        fadingTrailsRef.current.splice(index, 1);
      }

      for (
        let index = activeBulletsRef.current.length - 1;
        index >= 0;
        index -= 1
      ) {
        const activeBullet = activeBulletsRef.current[index];
        const { bullet, trail } = activeBullet;

        bullet.update(ticker.deltaTime, gameSpeedMultiplier);
        trail.recordPosition(bullet.position);

        if (
          bullet.isOutsideBounds(
            GAME_LAYOUT.Width,
            GAME_LAYOUT.Height,
            BULLET_DESPAWN_MARGIN
          )
        ) {
          despawnActiveBullet(activeBullet);
          activeBulletsRef.current.splice(index, 1);
          continue;
        }

        bullet.syncCollider(collisionWorldRef.current);
      }

      const isFirePressed = controlsRef.current.fire;

      if (!isFirePressed) {
        lastBulletFiredAtRef.current = null;
        return;
      }

      const gameTimeMs = gameTimeMsRef.current;
      const lastBulletFiredAt = lastBulletFiredAtRef.current;
      const canFire =
        lastBulletFiredAt === null ||
        gameTimeMs - lastBulletFiredAt >= BULLET_FIRE_DEBOUNCE_MS;

      if (canFire) {
        const spawnBulletSuccess = spawnBullet();

        if (spawnBulletSuccess) {
          lastBulletFiredAtRef.current = gameTimeMs;
        }
      }
    },
    [
      collisionWorldRef,
      controlsRef,
      despawnActiveBullet,
      gameTimeMsRef,
      spawnBullet,
      trailPool,
    ]
  );

  const cleanupInactiveBullets = useCallback(() => {
    for (
      let index = activeBulletsRef.current.length - 1;
      index >= 0;
      index -= 1
    ) {
      const activeBullet = activeBulletsRef.current[index];

      if (activeBullet.bullet.isActive) {
        continue;
      }

      despawnActiveBullet(activeBullet);
      activeBulletsRef.current.splice(index, 1);
    }
  }, [despawnActiveBullet]);

  const updateBulletGravity = useCallback(
    (ticker: Ticker) => {
      const { gamePhase, gameSpeedMultiplier } = useAppStore.getState();

      if (gamePhase !== GamePhase.Running) {
        return;
      }

      const activeBlackHoles = activeBlackHolesRef.current;

      if (activeBlackHoles.length === 0) {
        return;
      }

      const deltaTime = ticker.deltaTime * gameSpeedMultiplier;

      activeBulletsRef.current.forEach(({ bullet }) => {
        const acceleration = calculateBlackHoleGravityAcceleration(
          bullet.position,
          activeBlackHoles
        );

        bullet.applyGravity(acceleration, deltaTime);
      });
    },
    [activeBlackHolesRef]
  );

  useEffect(() => {
    return () => {
      activeBulletsRef.current.forEach(({ bullet, trail }) => {
        releaseBullet(bullet);
        trailPool.return(trail);
      });
      activeBulletsRef.current = [];

      fadingTrailsRef.current.forEach((trail) => {
        trailPool.return(trail);
      });
      fadingTrailsRef.current = [];

      bulletPool.clear();
      trailPool.clear();
    };
  }, [bulletPool, releaseBullet, trailPool]);

  useTick({
    callback: updateBulletGravity,
    priority: GAME_TICK_PRIORITY.GravityUpdate,
  });

  useTick({
    callback: updateBullets,
    priority: GAME_TICK_PRIORITY.EntityUpdate,
  });

  useTick({
    callback: cleanupInactiveBullets,
    priority: GAME_TICK_PRIORITY.EntityCleanup,
  });

  return (
    <pixiContainer label="bullet-root">
      <pixiContainer ref={trailLayerRef} label="bullet-trail-layer" />
      <pixiContainer ref={bulletLayerRef} label="bullet-layer" />
    </pixiContainer>
  );
}
