import type { RefObject } from 'react';

export type GameOverlayProps = {
  gameSurfaceRef: RefObject<HTMLElement | null>;
};

export type GameOverlayExitIntent =
  | {
      action: 'main-menu' | 'restart' | 'resume';
      modal: 'pause';
    }
  | {
      action: 'main-menu' | 'restart';
      modal: 'game-over';
    }
  | null;

export type UsePauseGameHotkeyOptions = {
  handlePause: () => void;
};
