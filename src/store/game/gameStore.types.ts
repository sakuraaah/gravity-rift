import type { DamageResult } from '@/game/systems/combat';

import type { GamePhase } from './gameStore.enums';

export type GameStore = {
  bulletDamage: number;
  damagePlayer: (damage: number, gameTimeMs: number) => DamageResult | null;
  gamePhase: GamePhase;
  gameSpeedMultiplier: number;
  playerHp: number;
  playerInvincibleUntilGameTimeMs: number;
  setBulletDamage: (damage: number) => void;
  setGamePhase: (gamePhase: GamePhase) => void;
  setGameSpeedMultiplier: (multiplier: number) => void;
};
