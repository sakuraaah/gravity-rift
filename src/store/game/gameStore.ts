import { create } from 'zustand';

import { applyDamage } from '@/game/systems/combat';

import {
  DEFAULT_BULLET_DAMAGE,
  DEFAULT_GAME_SPEED_MULTIPLIER,
  DEFAULT_PLAYER_HP,
  PLAYER_INVINCIBILITY_DURATION_MS,
} from './gameStore.constants';
import { GamePhase } from './gameStore.enums';
import type { GameStore } from './gameStore.types';

export const useGameStore = create<GameStore>()((set, get) => ({
  bulletDamage: DEFAULT_BULLET_DAMAGE,
  damagePlayer: (damage, gameTimeMs) => {
    const { playerHp, playerInvincibleUntilGameTimeMs } = get();

    if (playerHp <= 0 || gameTimeMs < playerInvincibleUntilGameTimeMs) {
      return null;
    }

    const result = applyDamage(playerHp, damage);

    if (result.appliedDamage > 0) {
      set({
        playerHp: result.remainingHp,
        playerInvincibleUntilGameTimeMs:
          gameTimeMs + PLAYER_INVINCIBILITY_DURATION_MS,
      });
    }

    return result;
  },
  gamePhase: GamePhase.Running,
  gameSpeedMultiplier: DEFAULT_GAME_SPEED_MULTIPLIER,
  playerHp: DEFAULT_PLAYER_HP,
  playerInvincibleUntilGameTimeMs: 0,
  setBulletDamage: (bulletDamage) => set({ bulletDamage }),
  setGamePhase: (gamePhase) => set({ gamePhase }),
  setGameSpeedMultiplier: (gameSpeedMultiplier) => set({ gameSpeedMultiplier }),
}));
