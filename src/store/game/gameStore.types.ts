import type { DamageResult } from '@/game/systems/combat';

export type GameStore = {
  bulletDamage: number;
  damagePlayer: (damage: number) => DamageResult | null;
  gameSpeedMultiplier: number;
  playerHp: number;
  playerInvincibleUntilMs: number;
  setBulletDamage: (damage: number) => void;
  setGameSpeedMultiplier: (multiplier: number) => void;
};
