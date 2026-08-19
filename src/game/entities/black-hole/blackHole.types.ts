import type { Vector2 } from '@/game/utils';

export type BlackHoleSpawnData = {
  location: Vector2;
};

export type BlackHoleInitData = BlackHoleSpawnData & {
  gameTimeMs: number;
};
