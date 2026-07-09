import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Pool, Ticker } from 'pixi.js';
import { Pool as PixiPool } from 'pixi.js';

import { GAME_LAYOUT } from '@/game/constants';
import { useGameContext } from '@/game/context';

import { Bullet } from './Bullet';
import {
  BULLET_DESPAWN_MARGIN,
  BULLET_FIRE_DEBOUNCE_MS,
  BULLET_MOVEMENT_SPEED,
} from './bullet.constants';
import type { BulletSpawnData } from './bullet.types';

export function BulletPool() {
  const { controlsRef, spaceshipLocationRef } = useGameContext();
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

    const { x, y, rotation } = spaceshipLocationRef.current;
    const bullet = bulletPool.get({
      location: {
        x,
        y,
        rotation,
      },
      speed: BULLET_MOVEMENT_SPEED,
    });

    bulletLayer.addChild(bullet);
    activeBulletsRef.current.push(bullet);

    return true;
  }, [bulletPool, spaceshipLocationRef]);

  const updateBullets = useCallback(
    (ticker: Ticker) => {
      for (
        let index = activeBulletsRef.current.length - 1;
        index >= 0;
        index -= 1
      ) {
        const bullet = activeBulletsRef.current[index];

        bullet.update(ticker.deltaTime);

        if (
          bullet.isOutsideBounds(
            GAME_LAYOUT.Width,
            GAME_LAYOUT.Height,
            BULLET_DESPAWN_MARGIN
          )
        ) {
          bulletPool.return(bullet);
          activeBulletsRef.current.splice(index, 1);
        }
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
    [bulletPool, controlsRef, spawnBullet]
  );

  useEffect(() => {
    return () => {
      activeBulletsRef.current.forEach((bullet) => {
        bulletPool.return(bullet);
      });
      activeBulletsRef.current = [];

      bulletPool.clear();
    };
  }, [bulletPool]);

  useTick(updateBullets);

  return <pixiContainer ref={bulletLayerRef} label="bullet-layer" />;
}
