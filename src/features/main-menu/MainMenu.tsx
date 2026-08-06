import { ControlFieldType, ControlGrid, Modal } from '@/shared/ui';
import type { ControlGridField } from '@/shared/ui';
import { AppScreen, useAppStore } from '@/store';

import { MainMenuControls } from './MainMenu.styles';
import type { MainMenuProps } from './MainMenu.types';

export function MainMenu({ gameSurfaceRef }: MainMenuProps) {
  const screen = useAppStore((state) => state.screen);
  const startGame = useAppStore((state) => state.startGame);
  const isOpen = screen === AppScreen.MainMenu;

  const handleOpenChangeComplete = (open: boolean) => {
    if (!open) {
      gameSurfaceRef.current?.focus({ preventScroll: true });
    }
  };

  const fields = [
    {
      buttonProps: {
        children: 'Start Game',
        fullWidth: true,
        onClick: startGame,
        variant: 'primary',
      },
      id: 'start-game',
      type: ControlFieldType.Button,
    },
  ] satisfies ControlGridField[];

  return (
    <Modal
      backdropStrength="strong"
      closable={false}
      disablePointerDismissal
      finalFocus={false}
      onOpenChangeComplete={handleOpenChangeComplete}
      open={isOpen}
      portalContainer={gameSurfaceRef}
      title="Gravity Rift"
    >
      <MainMenuControls>
        <ControlGrid fields={fields} />
      </MainMenuControls>
    </Modal>
  );
}
