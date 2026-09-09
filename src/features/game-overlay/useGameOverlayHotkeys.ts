import { useEffect } from 'react';

import { isGamePageSurface } from '@/game/systems/player-controls';
import { AppScreen, GamePhase, useAppStore } from '@/store';

import type { UseGameOverlayHotkeysOptions } from './GameOverlay.types';

export function useGameOverlayHotkeys({
  requestExit,
}: UseGameOverlayHotkeysOptions) {
  const gamePhase = useAppStore((state) => state.gamePhase);
  const screen = useAppStore((state) => state.screen);
  const pauseGame = useAppStore((state) => state.pauseGame);

  useEffect(() => {
    if (screen !== AppScreen.Game || gamePhase !== GamePhase.Running) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key !== 'Escape' ||
        event.repeat ||
        event.defaultPrevented ||
        !isGamePageSurface(event.target)
      ) {
        return;
      }

      event.preventDefault();
      pauseGame();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gamePhase, pauseGame, screen]);

  const handleModalOpenChange = (open: boolean) => {
    if (open || screen !== AppScreen.Game) return;

    if (gamePhase === GamePhase.Paused) {
      requestExit({ action: 'resume', modal: 'pause' });
    } else if (gamePhase === GamePhase.HowToPlay) {
      requestExit({ action: 'resume', modal: 'how-to-play' });
    }
  };

  return { handleModalOpenChange };
}
