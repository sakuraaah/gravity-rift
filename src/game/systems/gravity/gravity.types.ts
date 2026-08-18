import type { Vector2 } from '@/game/utils';

export type GravityProfile = {
  influenceRadius: number;
  strength: number;
};

export type BlackHoleGravityAccelerationResult = {
  acceleration: Vector2;
  isInfluenced: boolean;
};
