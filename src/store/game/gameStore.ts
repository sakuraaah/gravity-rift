import { create } from 'zustand';

import { applyDamage } from '@/game/systems/combat';

import {
  DEFAULT_BULLET_DAMAGE,
  DEFAULT_GAME_SPEED_MULTIPLIER,
  DEFAULT_PLAYER_HP,
} from './gameStore.constants';
import type { GameStore } from './gameStore.types';

export const useGameStore = create<GameStore>()((set, get) => ({
  bulletDamage: DEFAULT_BULLET_DAMAGE,
  damagePlayer: (damage) => {
    const result = applyDamage(get().playerHp, damage);

    if (result.appliedDamage > 0) {
      set({ playerHp: result.remainingHp });
    }

    return result;
  },
  gameSpeedMultiplier: DEFAULT_GAME_SPEED_MULTIPLIER,
  playerHp: DEFAULT_PLAYER_HP,
  setBulletDamage: (bulletDamage) => set({ bulletDamage }),
  setGameSpeedMultiplier: (gameSpeedMultiplier) => set({ gameSpeedMultiplier }),
}));
