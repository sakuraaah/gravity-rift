import { useState } from 'react';

import { GameHud } from '@/features/game-hud';
import {
  ControlFieldType,
  ControlGrid,
  Modal,
  ModalHeaderTone,
} from '@/shared/ui';
import type { ControlGridField } from '@/shared/ui';
import { AppScreen, GamePhase, useAppStore } from '@/store';

import { GameOverlayControls } from './GameOverlay.styles';
import type {
  GameOverlayExitIntent,
  GameOverlayProps,
} from './GameOverlay.types';
import { usePauseGameHotkey } from './usePauseGameHotkey';

export function GameOverlay({ gameSurfaceRef }: GameOverlayProps) {
  const [exitIntent, setExitIntent] = useState<GameOverlayExitIntent>(null);
  const screen = useAppStore((state) => state.screen);
  const gamePhase = useAppStore((state) => state.gamePhase);
  const goToMainMenu = useAppStore((state) => state.goToMainMenu);
  const pauseGame = useAppStore((state) => state.pauseGame);
  const restartGame = useAppStore((state) => state.restartGame);
  const resumeGame = useAppStore((state) => state.resumeGame);

  const isGameScreen = screen === AppScreen.Game;
  const isRunning = isGameScreen && gamePhase === GamePhase.Running;
  const isDying = isGameScreen && gamePhase === GamePhase.Dying;
  const isPaused = isGameScreen && gamePhase === GamePhase.Paused;
  const isGameOver = isGameScreen && gamePhase === GamePhase.GameOver;
  const isPauseModalOpen = isPaused && exitIntent?.modal !== 'pause';
  const isGameOverModalOpen = isGameOver && exitIntent?.modal !== 'game-over';

  usePauseGameHotkey({ handlePause: pauseGame });

  const requestExit = (intent: NonNullable<GameOverlayExitIntent>) => {
    setExitIntent((currentIntent) => currentIntent ?? intent);
  };

  const handlePauseModalOpenChange = (open: boolean) => {
    if (!open) {
      requestExit({ action: 'resume', modal: 'pause' });
    }
  };

  const handleModalOpenChangeComplete = (
    modal: NonNullable<GameOverlayExitIntent>['modal'],
    open: boolean
  ) => {
    if (open || exitIntent?.modal !== modal) {
      return;
    }

    const { action } = exitIntent;

    if (action === 'main-menu') {
      goToMainMenu();
    } else if (action === 'restart') {
      restartGame();
    } else {
      resumeGame();
    }

    setExitIntent(null);

    if (action !== 'main-menu') {
      gameSurfaceRef.current?.focus({ preventScroll: true });
    }
  };

  const pauseFields = [
    {
      buttonProps: {
        children: 'Resume',
        fullWidth: true,
        onClick: () => requestExit({ action: 'resume', modal: 'pause' }),
        variant: 'primary',
      },
      id: 'resume',
      type: ControlFieldType.Button,
    },
    {
      buttonProps: {
        children: 'Restart',
        fullWidth: true,
        onClick: () => requestExit({ action: 'restart', modal: 'pause' }),
        variant: 'secondary',
      },
      id: 'restart-game',
      type: ControlFieldType.Button,
    },
    {
      buttonProps: {
        children: 'Main Menu',
        fullWidth: true,
        onClick: () => requestExit({ action: 'main-menu', modal: 'pause' }),
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
        onClick: () => requestExit({ action: 'restart', modal: 'game-over' }),
        variant: 'primary',
      },
      id: 'restart-game',
      type: ControlFieldType.Button,
    },
    {
      buttonProps: {
        children: 'Main Menu',
        fullWidth: true,
        onClick: () => requestExit({ action: 'main-menu', modal: 'game-over' }),
        variant: 'secondary',
      },
      id: 'main-menu',
      type: ControlFieldType.Button,
    },
  ] satisfies ControlGridField[];

  return (
    <>
      {(isRunning || isDying) && <GameHud />}

      <Modal
        title="Game Paused"
        subtitle="Resume to continue"
        headerTone={ModalHeaderTone.Default}
        closable={false}
        disablePointerDismissal
        finalFocus={false}
        onOpenChange={handlePauseModalOpenChange}
        onOpenChangeComplete={(open) =>
          handleModalOpenChangeComplete('pause', open)
        }
        open={isPauseModalOpen}
        portalContainer={gameSurfaceRef}
      >
        <GameOverlayControls>
          <ControlGrid fields={pauseFields} />
        </GameOverlayControls>
      </Modal>

      <Modal
        title="Game Over"
        subtitle="Signal Lost"
        headerTone={ModalHeaderTone.Critical}
        closable={false}
        disablePointerDismissal
        finalFocus={false}
        onOpenChangeComplete={(open) =>
          handleModalOpenChangeComplete('game-over', open)
        }
        open={isGameOverModalOpen}
        portalContainer={gameSurfaceRef}
      >
        <GameOverlayControls>
          <ControlGrid fields={gameOverFields} />
        </GameOverlayControls>
      </Modal>
    </>
  );
}
