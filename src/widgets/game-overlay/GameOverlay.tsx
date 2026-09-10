import { useState } from 'react';

import { GameHud } from '@/features/game-hud';
import { ModalGamePause } from '@/features/game-pause';
import { ModalHowToPlay } from '@/features/how-to-play';
import {
  ControlFieldType,
  ControlGrid,
  Modal,
  ModalControls,
  ModalHeaderTone,
} from '@/shared/ui';
import type { ControlGridField } from '@/shared/ui';
import { AppScreen, GamePhase, useAppStore } from '@/store';

import { GameOverContent } from './GameOverlay.styles';
import type {
  GameOverlayExitIntent,
  GameOverlayProps,
} from './GameOverlay.types';
import { GameOverStats } from './components';
import { useGameOverlayHotkeys } from './useGameOverlayHotkeys';

export function GameOverlay({ gameSurfaceRef }: GameOverlayProps) {
  const [exitIntent, setExitIntent] = useState<GameOverlayExitIntent>(null);
  const screen = useAppStore((state) => state.screen);
  const gamePhase = useAppStore((state) => state.gamePhase);
  const goToMainMenu = useAppStore((state) => state.goToMainMenu);
  const restartGame = useAppStore((state) => state.restartGame);
  const resumeGame = useAppStore((state) => state.resumeGame);
  const score = useAppStore((state) => state.score);
  const wave = useAppStore((state) => state.wave);

  const isGameScreen = screen === AppScreen.Game;
  const isRunning = isGameScreen && gamePhase === GamePhase.Running;
  const isDying = isGameScreen && gamePhase === GamePhase.Dying;
  const isPaused = isGameScreen && gamePhase === GamePhase.Paused;
  const isHowToPlay = isGameScreen && gamePhase === GamePhase.HowToPlay;
  const isGameOver = isGameScreen && gamePhase === GamePhase.GameOver;
  const isPauseModalOpen = isPaused && exitIntent?.modal !== 'pause';
  const isHowToPlayModalOpen =
    isHowToPlay && exitIntent?.modal !== 'how-to-play';
  const isGameOverModalOpen = isGameOver && exitIntent?.modal !== 'game-over';

  const requestExit = (intent: NonNullable<GameOverlayExitIntent>) => {
    setExitIntent((currentIntent) => currentIntent ?? intent);
  };

  const { handleModalOpenChange } = useGameOverlayHotkeys({ requestExit });

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

      <ModalHowToPlay
        gameSurfaceRef={gameSurfaceRef}
        onConfirm={() =>
          requestExit({ action: 'resume', modal: 'how-to-play' })
        }
        onOpenChange={handleModalOpenChange}
        onOpenChangeComplete={(open) =>
          handleModalOpenChangeComplete('how-to-play', open)
        }
        open={isHowToPlayModalOpen}
      />

      <ModalGamePause
        onResume={() => requestExit({ action: 'resume', modal: 'pause' })}
        onRestart={() => requestExit({ action: 'restart', modal: 'pause' })}
        onMainMenu={() => requestExit({ action: 'main-menu', modal: 'pause' })}
        onOpenChange={handleModalOpenChange}
        onOpenChangeComplete={(open) =>
          handleModalOpenChangeComplete('pause', open)
        }
        open={isPauseModalOpen}
        portalContainer={gameSurfaceRef}
      />

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
        maxWidth="400px"
      >
        <GameOverContent>
          <GameOverStats score={score} wave={wave} />
          <ModalControls>
            <ControlGrid fields={gameOverFields} />
          </ModalControls>
        </GameOverContent>
      </Modal>
    </>
  );
}
