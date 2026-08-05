import { useEffect } from 'react';

import { GamePhase, useAppStore } from '@/store';

export function usePauseGameHotkey() {
  const gamePhase = useAppStore((state) => state.gamePhase);
  const pauseGame = useAppStore((state) => state.pauseGame);

  useEffect(() => {
    if (gamePhase !== GamePhase.Running) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.repeat || event.defaultPrevented) {
        return;
      }

      event.preventDefault();
      pauseGame();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gamePhase, pauseGame]);
}
