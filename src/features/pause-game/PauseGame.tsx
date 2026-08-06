import { useCallback } from 'react';

import {
  ControlFieldType,
  ControlGrid,
  Modal,
  PixelIconButton,
  useModal,
} from '@/shared/ui';
import type { ControlGridField } from '@/shared/ui';
import { GamePhase, useAppStore } from '@/store';

import { PauseButtonPosition, PauseControls } from './PauseGame.styles';
import type { PauseGameProps } from './PauseGame.types';
import { PauseIcon } from './PauseIcon';
import { usePauseGameHotkey } from './usePauseGameHotkey';

export function PauseGame({ gameSurfaceRef }: PauseGameProps) {
  const gamePhase = useAppStore((state) => state.gamePhase);

  const pauseGame = useAppStore((state) => state.pauseGame);
  const resumeGame = useAppStore((state) => state.resumeGame);

  const isPaused = gamePhase === GamePhase.Paused;
  const isPauseAvailable = gamePhase === GamePhase.Running || isPaused;

  const handleModalOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        pauseGame();
        return;
      }

      resumeGame();
    },
    [pauseGame, resumeGame]
  );

  const modal = useModal({
    onOpenChange: handleModalOpenChange,
    open: isPaused,
  });

  usePauseGameHotkey({ handlePause: modal.open });

  const handleOpenChangeComplete = (open: boolean) => {
    if (!open) {
      gameSurfaceRef.current?.focus({ preventScroll: true });
    }
  };

  const fields = [
    {
      buttonProps: {
        children: 'Resume',
        fullWidth: true,
        onClick: modal.close,
        variant: 'primary',
      },
      id: 'resume',
      type: ControlFieldType.Button,
    },
  ] satisfies ControlGridField[];

  return isPauseAvailable ? (
    <>
      <PauseButtonPosition>
        <PixelIconButton
          aria-label="Pause game"
          onClick={modal.open}
          variant="secondary"
        >
          <PauseIcon />
        </PixelIconButton>
      </PauseButtonPosition>

      <Modal
        closable={false}
        description="Press Resume to continue."
        disablePointerDismissal
        finalFocus={false}
        onOpenChange={modal.setOpen}
        onOpenChangeComplete={handleOpenChangeComplete}
        open={modal.isOpen}
        portalContainer={gameSurfaceRef}
        title="Game Paused"
      >
        <PauseControls>
          <ControlGrid fields={fields} />
        </PauseControls>
      </Modal>
    </>
  ) : null;
}
