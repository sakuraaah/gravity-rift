import type { DamageResult } from '@/game/systems/combat';

export type GameStore = {
  bulletDamage: number;
  damagePlayer: (damage: number) => DamageResult;
  gameSpeedMultiplier: number;
  playerHp: number;
  setBulletDamage: (damage: number) => void;
  setGameSpeedMultiplier: (multiplier: number) => void;
};
