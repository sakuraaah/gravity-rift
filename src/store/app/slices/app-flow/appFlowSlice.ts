import type { StateCreator } from 'zustand';

import type { AppStore } from '@/store/app/appStore.types';
import { DEFAULT_GAME_STATE } from '@/store/app/slices/game/gameSlice.constants';

import { DEFAULT_APP_FLOW_STATE } from './appFlowSlice.constants';
import { AppScreen, GamePhase } from './appFlowSlice.enums';
import type { AppFlowSlice, AppFlowState } from './appFlowSlice.types';

function createStartedGameState(
  runId: number
): AppFlowState & typeof DEFAULT_GAME_STATE {
  return {
    ...DEFAULT_GAME_STATE,
    gamePhase: GamePhase.Running,
    runId: runId + 1,
    screen: AppScreen.Game,
  };
}

export const createAppFlowSlice: StateCreator<
  AppStore,
  [],
  [],
  AppFlowSlice
> = (set, get) => ({
  ...DEFAULT_APP_FLOW_STATE,
  endGame: () => {
    const { gamePhase, screen } = get();

    if (screen !== AppScreen.Game || gamePhase !== GamePhase.Dying) {
      return;
    }

    set({ gamePhase: GamePhase.GameOver });
  },
  goToMainMenu: () => {
    set({
      gamePhase: GamePhase.Idle,
      screen: AppScreen.MainMenu,
    });
  },
  pauseGame: () => {
    const { gamePhase, screen } = get();

    if (screen !== AppScreen.Game || gamePhase !== GamePhase.Running) {
      return;
    }

    set({ gamePhase: GamePhase.Paused });
  },
  restartGame: () => {
    const { gamePhase, screen } = get();
    const isRestartable =
      gamePhase === GamePhase.GameOver || gamePhase === GamePhase.Paused;

    if (screen !== AppScreen.Game || !isRestartable) {
      return;
    }

    set(({ runId }) => createStartedGameState(runId));
  },
  resumeGame: () => {
    const { gamePhase, screen } = get();

    if (screen !== AppScreen.Game || gamePhase !== GamePhase.Paused) {
      return;
    }

    set({ gamePhase: GamePhase.Running });
  },
  startGame: () => {
    const { gamePhase, screen } = get();

    if (screen !== AppScreen.MainMenu || gamePhase !== GamePhase.Idle) {
      return;
    }

    set(({ runId }) => createStartedGameState(runId));
  },
});
