import type { DamageResult } from '@/game/systems/combat';

export type GameState = {
  bulletDamage: number;
  gameSpeedMultiplier: number;
  playerHp: number;
  playerInvincibleUntilGameTimeMs: number;
};

export type GameSlice = GameState & {
  damagePlayer: (damage: number, gameTimeMs: number) => DamageResult | null;
  setBulletDamage: (damage: number) => void;
  setGameSpeedMultiplier: (multiplier: number) => void;
};
