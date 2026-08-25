import type { Vector2 } from '@/game/utils';

export type BulletSpawnData = {
  damage: number;
  location: Vector2;
  velocity: Vector2;
};
