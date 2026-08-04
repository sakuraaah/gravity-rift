import { AppScreen, GamePhase } from './appFlowSlice.enums';
import type { AppFlowState } from './appFlowSlice.types';

export const DEFAULT_APP_FLOW_STATE = {
  gamePhase: GamePhase.Running,
  runId: 0,
  screen: AppScreen.Game,
} as const satisfies AppFlowState;
