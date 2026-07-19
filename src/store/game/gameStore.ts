import { create } from 'zustand';

import { DEFAULT_GAME_SPEED_MULTIPLIER } from './gameStore.constants';
import type { GameStore } from './gameStore.types';

export const useGameStore = create<GameStore>()((set) => ({
  gameSpeedMultiplier: DEFAULT_GAME_SPEED_MULTIPLIER,
  setGameSpeedMultiplier: (gameSpeedMultiplier) => set({ gameSpeedMultiplier }),
}));
