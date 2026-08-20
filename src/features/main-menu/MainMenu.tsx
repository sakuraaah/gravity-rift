import { ControlFieldType, ControlGrid } from '@/shared/ui';
import type { ControlGridField } from '@/shared/ui';
import { TypographyVariant } from '@/shared/ui/Typography';
import { AppScreen, useAppStore } from '@/store';

import {
  MainMenuControls,
  MainMenuDivider,
  MainMenuRoot,
  MainMenuSubtitle,
  MainMenuTitle,
} from './MainMenu.styles';
import type { MainMenuProps } from './MainMenu.types';

export function MainMenu({ gameSurfaceRef }: MainMenuProps) {
  const screen = useAppStore((state) => state.screen);
  const startGame = useAppStore((state) => state.startGame);
  const isOpen = screen === AppScreen.MainMenu;

  const handleStartGame = () => {
    startGame();
    gameSurfaceRef.current?.focus({ preventScroll: true });
  };

  const fields = [
    {
      buttonProps: {
        autoFocus: true,
        children: 'Start Game',
        fullWidth: true,
        onClick: handleStartGame,
        variant: 'primary',
      },
      id: 'start-game',
      type: ControlFieldType.Button,
    },
  ] satisfies ControlGridField[];

  return (
    <>
      {isOpen ? (
        <MainMenuRoot aria-labelledby="main-menu-title">
          <MainMenuSubtitle
            component="p"
            variant={TypographyVariant.MainMenuSubtitle}
          >
            Pixel arcade shooter
          </MainMenuSubtitle>
          <MainMenuTitle
            id="main-menu-title"
            component="h1"
            variant={TypographyVariant.MainMenuTitle}
          >
            Gravity Rift
          </MainMenuTitle>
          <MainMenuDivider />
          <MainMenuControls>
            <ControlGrid fields={fields} gap="13px" />
          </MainMenuControls>
        </MainMenuRoot>
      ) : null}
    </>
  );
}
