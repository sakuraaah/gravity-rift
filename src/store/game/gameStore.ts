import { create } from 'zustand';

import { applyDamage } from '@/game/systems/combat';

import {
  DEFAULT_BULLET_DAMAGE,
  DEFAULT_GAME_SPEED_MULTIPLIER,
  DEFAULT_PLAYER_HP,
  PLAYER_INVINCIBILITY_DURATION_MS,
} from './gameStore.constants';
import type { GameStore } from './gameStore.types';

export const useGameStore = create<GameStore>()((set, get) => ({
  bulletDamage: DEFAULT_BULLET_DAMAGE,
  damagePlayer: (damage) => {
    const now = performance.now();
    const { playerHp, playerInvincibleUntilMs } = get();

    if (playerHp <= 0 || now < playerInvincibleUntilMs) {
      return null;
    }

    const result = applyDamage(playerHp, damage);

    if (result.appliedDamage > 0) {
      set({
        playerHp: result.remainingHp,
        playerInvincibleUntilMs: now + PLAYER_INVINCIBILITY_DURATION_MS,
      });
    }

    return result;
  },
  gameSpeedMultiplier: DEFAULT_GAME_SPEED_MULTIPLIER,
  playerHp: DEFAULT_PLAYER_HP,
  playerInvincibleUntilMs: 0,
  setBulletDamage: (bulletDamage) => set({ bulletDamage }),
  setGameSpeedMultiplier: (gameSpeedMultiplier) => set({ gameSpeedMultiplier }),
}));
