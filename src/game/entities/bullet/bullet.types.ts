import type { Vector2 } from '@/game/utils';

export type BulletLocation = {
  x: number;
  y: number;
  rotation: number;
};

export type BulletSpawnData = {
  location: BulletLocation;
  velocity: Vector2;
};
