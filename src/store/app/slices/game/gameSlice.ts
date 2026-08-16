import type { StateCreator } from 'zustand';

import { applyDamage } from '@/game/systems/combat';
import type { AppStore } from '@/store/app/appStore.types';
import { GamePhase } from '@/store/app/slices/app-flow/appFlowSlice.enums';

import {
  DEFAULT_GAME_STATE,
  PLAYER_INVINCIBILITY_DURATION_MS,
} from './gameSlice.constants';
import type { GameSlice } from './gameSlice.types';

export const createGameSlice: StateCreator<AppStore, [], [], GameSlice> = (
  set,
  get
) => ({
  ...DEFAULT_GAME_STATE,
  damagePlayer: (damage, gameTimeMs) => {
    const { gamePhase, playerHp, playerInvincibleUntilGameTimeMs } = get();

    if (
      gamePhase !== GamePhase.Running ||
      playerHp <= 0 ||
      gameTimeMs < playerInvincibleUntilGameTimeMs
    ) {
      return null;
    }

    const result = applyDamage(playerHp, damage);

    if (result.appliedDamage > 0) {
      set({
        ...(result.destroyed ? { gamePhase: GamePhase.Dying } : {}),
        playerHp: result.remainingHp,
        playerInvincibleUntilGameTimeMs:
          gameTimeMs + PLAYER_INVINCIBILITY_DURATION_MS,
      });
    }

    return result;
  },
  defeatPlayer: () => {
    const { gamePhase, playerHp } = get();

    if (gamePhase !== GamePhase.Running || playerHp <= 0) {
      return;
    }

    set({
      gamePhase: GamePhase.Dying,
      playerHp: 0,
    });
  },
  setBulletDamage: (bulletDamage) => set({ bulletDamage }),
  setGameSpeedMultiplier: (gameSpeedMultiplier) => set({ gameSpeedMultiplier }),
});
