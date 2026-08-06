import type { RefObject } from 'react';

export type GameOverlayProps = {
  gameSurfaceRef: RefObject<HTMLElement | null>;
};

export type UsePauseGameHotkeyOptions = {
  handlePause: () => void;
};
