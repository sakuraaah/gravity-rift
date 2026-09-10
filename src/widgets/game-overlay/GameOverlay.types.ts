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
      action: 'resume';
      modal: 'how-to-play';
    }
  | {
      action: 'main-menu' | 'restart';
      modal: 'game-over';
    }
  | null;

export type UseGameOverlayHotkeysOptions = {
  requestExit: (intent: NonNullable<GameOverlayExitIntent>) => void;
};
