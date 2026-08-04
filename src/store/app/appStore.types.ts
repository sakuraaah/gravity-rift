import type { AppFlowSlice } from './slices/app-flow';
import type { GameSlice } from './slices/game';

export type AppStore = AppFlowSlice & GameSlice;
