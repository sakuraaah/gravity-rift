import { GameDialog, PixelButton, PixelIconButton } from '@/shared/ui';
import { GamePhase, useAppStore } from '@/store';

import { PauseButtonPosition, PauseDialogActions } from './PauseGame.styles';
import type { PauseGameProps } from './PauseGame.types';
import { PauseIcon } from './PauseIcon';
import { usePauseGameHotkey } from './usePauseGameHotkey';

export function PauseGame({ gameSurfaceRef }: PauseGameProps) {
  const gamePhase = useAppStore((state) => state.gamePhase);
  const pauseGame = useAppStore((state) => state.pauseGame);
  const resumeGame = useAppStore((state) => state.resumeGame);
  const isPaused = gamePhase === GamePhase.Paused;
  const isPauseAvailable = gamePhase === GamePhase.Running || isPaused;

  usePauseGameHotkey();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      pauseGame();
      return;
    }

    resumeGame();
  };

  const handleOpenChangeComplete = (open: boolean) => {
    if (!open) {
      gameSurfaceRef.current?.focus({ preventScroll: true });
    }
  };

  return isPauseAvailable ? (
    <GameDialog.Root
      disablePointerDismissal
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
      open={isPaused}
    >
      <PauseButtonPosition>
        <GameDialog.Trigger
          render={
            <PixelIconButton aria-label="Pause game" variant="secondary">
              <PauseIcon />
            </PixelIconButton>
          }
        />
      </PauseButtonPosition>

      <GameDialog.Portal container={gameSurfaceRef}>
        <GameDialog.Backdrop />
        <GameDialog.Viewport>
          <GameDialog.Popup finalFocus={false}>
            <GameDialog.Title>// SYSTEM HALT</GameDialog.Title>
            <GameDialog.Description>Game paused</GameDialog.Description>

            <PauseDialogActions>
              <GameDialog.Close
                render={
                  <PixelButton fullWidth variant="primary">
                    Continue
                  </PixelButton>
                }
              />
            </PauseDialogActions>
          </GameDialog.Popup>
        </GameDialog.Viewport>
      </GameDialog.Portal>
    </GameDialog.Root>
  ) : null;
}
