import { useCallback } from 'react';

import {
  ControlFieldType,
  ControlGrid,
  Modal,
  PixelIconButton,
  useModal,
} from '@/shared/ui';
import type { ControlGridField } from '@/shared/ui';
import { AppScreen, GamePhase, useAppStore } from '@/store';

import {
  GameOverlayControls,
  GameOverlayPauseButtonPosition,
} from './GameOverlay.styles';
import type { GameOverlayProps } from './GameOverlay.types';
import { PauseIcon } from './PauseIcon';
import { usePauseGameHotkey } from './usePauseGameHotkey';

export function GameOverlay({ gameSurfaceRef }: GameOverlayProps) {
  const screen = useAppStore((state) => state.screen);
  const gamePhase = useAppStore((state) => state.gamePhase);
  const goToMainMenu = useAppStore((state) => state.goToMainMenu);
  const pauseGame = useAppStore((state) => state.pauseGame);
  const restartGame = useAppStore((state) => state.restartGame);
  const resumeGame = useAppStore((state) => state.resumeGame);

  const isGameScreen = screen === AppScreen.Game;
  const isRunning = isGameScreen && gamePhase === GamePhase.Running;
  const isPaused = isGameScreen && gamePhase === GamePhase.Paused;
  const isGameOver = isGameScreen && gamePhase === GamePhase.GameOver;

  const handlePauseModalOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        pauseGame();
        return;
      }

      resumeGame();
    },
    [pauseGame, resumeGame]
  );

  const pauseModal = useModal({
    onOpenChange: handlePauseModalOpenChange,
    open: isPaused,
  });

  usePauseGameHotkey({ handlePause: pauseModal.open });

  const handleOpenChangeComplete = (open: boolean) => {
    if (!open) {
      gameSurfaceRef.current?.focus({ preventScroll: true });
    }
  };

  const pauseFields = [
    {
      buttonProps: {
        children: 'Resume',
        fullWidth: true,
        onClick: pauseModal.close,
        variant: 'primary',
      },
      id: 'resume',
      type: ControlFieldType.Button,
    },
    {
      buttonProps: {
        children: 'Restart',
        fullWidth: true,
        onClick: restartGame,
        variant: 'secondary',
      },
      id: 'restart-game',
      type: ControlFieldType.Button,
    },
    {
      buttonProps: {
        children: 'Main Menu',
        fullWidth: true,
        onClick: goToMainMenu,
        variant: 'danger',
      },
      id: 'main-menu',
      type: ControlFieldType.Button,
    },
  ] satisfies ControlGridField[];

  const gameOverFields = [
    {
      buttonProps: {
        children: 'Restart',
        fullWidth: true,
        onClick: restartGame,
        variant: 'primary',
      },
      id: 'restart-game',
      type: ControlFieldType.Button,
    },
    {
      buttonProps: {
        children: 'Main Menu',
        fullWidth: true,
        onClick: goToMainMenu,
        variant: 'secondary',
      },
      id: 'main-menu',
      type: ControlFieldType.Button,
    },
  ] satisfies ControlGridField[];

  return (
    <>
      {isRunning && (
        <GameOverlayPauseButtonPosition>
          <PixelIconButton
            aria-label="Pause game"
            onClick={pauseModal.open}
            variant="secondary"
          >
            <PauseIcon />
          </PixelIconButton>
        </GameOverlayPauseButtonPosition>
      )}

      <Modal
        closable={false}
        description="Press Resume to continue."
        disablePointerDismissal
        finalFocus={false}
        onOpenChange={pauseModal.setOpen}
        onOpenChangeComplete={handleOpenChangeComplete}
        open={pauseModal.isOpen}
        portalContainer={gameSurfaceRef}
        title="Game Paused"
      >
        <GameOverlayControls>
          <ControlGrid fields={pauseFields} />
        </GameOverlayControls>
      </Modal>

      <Modal
        closable={false}
        disablePointerDismissal
        finalFocus={false}
        onOpenChangeComplete={handleOpenChangeComplete}
        open={isGameOver}
        portalContainer={gameSurfaceRef}
        title="Game Over"
      >
        <GameOverlayControls>
          <ControlGrid fields={gameOverFields} />
        </GameOverlayControls>
      </Modal>
    </>
  );
}
