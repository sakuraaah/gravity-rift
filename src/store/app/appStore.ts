import { create } from 'zustand';

import type { AppStore } from './appStore.types';
import { createAppFlowSlice, createGameSlice } from './slices';

export const useAppStore = create<AppStore>()((...storeApi) => ({
  ...createAppFlowSlice(...storeApi),
  ...createGameSlice(...storeApi),
}));
