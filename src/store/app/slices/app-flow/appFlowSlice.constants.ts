import { AppScreen, GamePhase } from './appFlowSlice.enums';
import type { AppFlowState } from './appFlowSlice.types';

export const DEFAULT_APP_FLOW_STATE = {
  gamePhase: GamePhase.Idle,
  runId: 0,
  screen: AppScreen.MainMenu,
} as const satisfies AppFlowState;
