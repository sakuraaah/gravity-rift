import { useEffect } from 'react';

import { GamePhase, useAppStore } from '@/store';

import type { UsePauseGameHotkeyOptions } from './GameOverlay.types';

export function usePauseGameHotkey({ handlePause }: UsePauseGameHotkeyOptions) {
  const gamePhase = useAppStore((state) => state.gamePhase);

  useEffect(() => {
    if (gamePhase !== GamePhase.Running) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.repeat || event.defaultPrevented) {
        return;
      }

      event.preventDefault();
      handlePause();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gamePhase, handlePause]);
}
