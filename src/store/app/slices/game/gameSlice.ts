import type { StateCreator } from 'zustand';

import { applyDamage } from '@/game/systems/combat';
import type { AppStore } from '@/store/app/appStore.types';
import { GamePhase } from '@/store/app/slices/app-flow/appFlowSlice.enums';

import {
  DEFAULT_GAME_STATE,
  DEFAULT_PRESSED_KEYS,
  DEFAULT_PRESSED_MOUSE_BUTTONS,
  PLAYER_INVINCIBILITY_DURATION_MS,
} from './gameSlice.constants';
import type { GameSlice } from './gameSlice.types';

export const createGameSlice: StateCreator<AppStore, [], [], GameSlice> = (
  set,
  get
) => ({
  ...DEFAULT_GAME_STATE,
  addScore: (points) => {
    if (!Number.isFinite(points) || points <= 0) {
      return;
    }

    set(({ score }) => ({ score: score + points }));
  },
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
  increaseWave: () => set(({ wave }) => ({ wave: wave + 1 })),
  resetPressedInputs: () =>
    set({
      pressedKeys: DEFAULT_PRESSED_KEYS,
      pressedMouseButtons: DEFAULT_PRESSED_MOUSE_BUTTONS,
    }),
  setBulletDamage: (bulletDamage) => set({ bulletDamage }),
  setGameSpeedMultiplier: (gameSpeedMultiplier) => set({ gameSpeedMultiplier }),
  setPressedKey: (key, isPressed) => {
    const { pressedKeys } = get();

    if (pressedKeys[key] === isPressed) {
      return;
    }

    set({
      pressedKeys: {
        ...pressedKeys,
        [key]: isPressed,
      },
    });
  },
  setPressedMouseButton: (button, isPressed) => {
    const { pressedMouseButtons } = get();

    if (pressedMouseButtons[button] === isPressed) {
      return;
    }

    set({
      pressedMouseButtons: {
        ...pressedMouseButtons,
        [button]: isPressed,
      },
    });
  },
});
