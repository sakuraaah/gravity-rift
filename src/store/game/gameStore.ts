import { create } from 'zustand';

import {
  DEFAULT_BULLET_DAMAGE,
  DEFAULT_GAME_SPEED_MULTIPLIER,
} from './gameStore.constants';
import type { GameStore } from './gameStore.types';

export const useGameStore = create<GameStore>()((set) => ({
  bulletDamage: DEFAULT_BULLET_DAMAGE,
  gameSpeedMultiplier: DEFAULT_GAME_SPEED_MULTIPLIER,
  setBulletDamage: (bulletDamage) => set({ bulletDamage }),
  setGameSpeedMultiplier: (gameSpeedMultiplier) => set({ gameSpeedMultiplier }),
}));
