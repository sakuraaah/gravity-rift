import { useSyncExternalStore } from 'react';

import {
  getIsDesktopSupportedSnapshot,
  subscribeToDesktopSupportChanges,
} from './desktopSupport.utils';

export function useIsDesktopSupported() {
  return useSyncExternalStore(
    subscribeToDesktopSupportChanges,
    getIsDesktopSupportedSnapshot
  );
}
