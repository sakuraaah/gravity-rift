import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Pool, Ticker } from 'pixi.js';
import { Pool as PixiPool } from 'pixi.js';

import { GAME_LAYOUT } from '@/game/constants';
import { useGameContext } from '@/game/context';
import { GameTickPriority } from '@/game/systems';
import { useGameStore } from '@/store';

import { Bullet } from './Bullet';
import {
  BULLET_BASE_MOVEMENT_SPEED,
  BULLET_DESPAWN_MARGIN,
  BULLET_FIRE_DEBOUNCE_MS,
} from './bullet.constants';
import type { BulletSpawnData } from './bullet.types';

export function BulletPool() {
  const { collisionWorldRef, controlsRef, spaceshipLocationRef } =
    useGameContext();
  const bulletLayerRef = useRef<Container>(null);
  const activeBulletsRef = useRef<Bullet[]>([]);
  const lastBulletFiredAtRef = useRef<number | null>(null);
  const bulletPool = useMemo<Pool<Bullet, BulletSpawnData>>(
    () => new PixiPool(Bullet),
    []
  );

  const spawnBullet = useCallback(() => {
    const bulletLayer = bulletLayerRef.current;

    if (!bulletLayer) {
      return false;
    }

    const collisionWorld = collisionWorldRef.current;
    const { x, y, rotation } = spaceshipLocationRef.current;
    const velocity = {
      x: Math.sin(rotation) * BULLET_BASE_MOVEMENT_SPEED,
      y: -Math.cos(rotation) * BULLET_BASE_MOVEMENT_SPEED,
    };
    const bullet = bulletPool.get({
      damage: useGameStore.getState().bulletDamage,
      location: {
        x,
        y,
        rotation,
      },
      velocity,
    });

    bullet.registerCollider(collisionWorld);
    bulletLayer.addChild(bullet);
    activeBulletsRef.current.push(bullet);

    return true;
  }, [bulletPool, collisionWorldRef, spaceshipLocationRef]);

  const updateBullets = useCallback(
    (ticker: Ticker) => {
      const collisionWorld = collisionWorldRef.current;
      const speedMultiplier = useGameStore.getState().gameSpeedMultiplier;

      for (
        let index = activeBulletsRef.current.length - 1;
        index >= 0;
        index -= 1
      ) {
        const bullet = activeBulletsRef.current[index];

        bullet.update(ticker.deltaTime, speedMultiplier);

        if (
          bullet.isOutsideBounds(
            GAME_LAYOUT.Width,
            GAME_LAYOUT.Height,
            BULLET_DESPAWN_MARGIN
          )
        ) {
          bullet.unregisterCollider(collisionWorld);
          bulletPool.return(bullet);
          activeBulletsRef.current.splice(index, 1);
          continue;
        }

        bullet.syncCollider(collisionWorld);
      }

      const isFirePressed = controlsRef.current.fire;

      if (!isFirePressed) {
        lastBulletFiredAtRef.current = null;
        return;
      }

      const now = performance.now();
      const lastBulletFiredAt = lastBulletFiredAtRef.current;
      const canFire =
        lastBulletFiredAt === null ||
        now - lastBulletFiredAt >= BULLET_FIRE_DEBOUNCE_MS;

      if (canFire) {
        const spawnBulletSuccess = spawnBullet();

        if (spawnBulletSuccess) {
          lastBulletFiredAtRef.current = now;
        }
      }
    },
    [bulletPool, collisionWorldRef, controlsRef, spawnBullet]
  );

  useEffect(() => {
    const collisionWorld = collisionWorldRef.current;

    return () => {
      activeBulletsRef.current.forEach((bullet) => {
        bullet.unregisterCollider(collisionWorld);
        bulletPool.return(bullet);
      });
      activeBulletsRef.current = [];

      bulletPool.clear();
    };
  }, [bulletPool, collisionWorldRef]);

  useTick({
    callback: updateBullets,
    priority: GameTickPriority.EntityUpdate,
  });

  return <pixiContainer ref={bulletLayerRef} label="bullet-layer" />;
}
