import type { RefObject } from 'react';

export type PauseGameProps = {
  gameSurfaceRef: RefObject<HTMLElement | null>;
};

export type UsePauseGameHotkeyOptions = {
  handlePause: () => void;
};
