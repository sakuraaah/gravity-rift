import { Modal, ModalHeaderTone } from '@/shared/ui';

import type { ModalHowToPlayProps } from './ModalHowToPlay.types';
import { HowToPlayContent } from './components';

export function ModalHowToPlay({
  gameSurfaceRef,
  onConfirm,
  onOpenChange,
  onOpenChangeComplete,
  open,
}: ModalHowToPlayProps) {
  return (
    <Modal
      title="How to Play"
      subtitle="Survive the rift"
      initialFocus={() =>
        gameSurfaceRef.current?.querySelector<HTMLElement>('[role="dialog"]') ??
        null
      }
      headerTone={ModalHeaderTone.Default}
      closable={false}
      disablePointerDismissal
      finalFocus={false}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      portalContainer={gameSurfaceRef}
      maxWidth="600px"
    >
      <HowToPlayContent onConfirm={onConfirm} />
    </Modal>
  );
}
