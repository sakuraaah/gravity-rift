import {
  ControlFieldType,
  ControlGrid,
  Modal,
  ModalControls,
  ModalHeaderTone,
} from '@/shared/ui';
import type { ControlGridField } from '@/shared/ui';

import type { ModalGamePauseProps } from './ModalGamePause.types';

export function ModalGamePause({
  onResume,
  onRestart,
  onMainMenu,
  onOpenChange,
  onOpenChangeComplete,
  open,
  portalContainer,
}: ModalGamePauseProps) {
  const pauseFields = [
    {
      buttonProps: {
        children: 'Resume',
        fullWidth: true,
        onClick: onResume,
        variant: 'primary',
      },
      id: 'resume',
      type: ControlFieldType.Button,
    },
    {
      buttonProps: {
        children: 'Restart',
        fullWidth: true,
        onClick: onRestart,
        variant: 'secondary',
      },
      id: 'restart-game',
      type: ControlFieldType.Button,
    },
    {
      buttonProps: {
        children: 'Main Menu',
        fullWidth: true,
        onClick: onMainMenu,
        variant: 'danger',
      },
      id: 'main-menu',
      type: ControlFieldType.Button,
    },
  ] satisfies ControlGridField[];

  return (
    <Modal
      title="Game Paused"
      subtitle="Resume to continue"
      headerTone={ModalHeaderTone.Default}
      closable={false}
      disablePointerDismissal
      finalFocus={false}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      portalContainer={portalContainer}
    >
      <ModalControls>
        <ControlGrid fields={pauseFields} />
      </ModalControls>
    </Modal>
  );
}
