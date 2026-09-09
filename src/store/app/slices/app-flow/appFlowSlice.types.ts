import type { AppScreen, GamePhase } from './appFlowSlice.enums';

export type AppFlowState = {
  gamePhase: GamePhase;
  runId: number;
  screen: AppScreen;
};

export type AppFlowSlice = AppFlowState & {
  endGame: () => void;
  goToMainMenu: () => void;
  pauseGame: () => void;
  openHowToPlay: () => void;
  restartGame: () => void;
  resumeGame: () => void;
  startGame: () => void;
};
