import type { ReactNode, RefObject } from 'react';

import type { GameSpeed, PlayerControls } from '@/game/systems';

export type SpaceshipLocation = {
  facingIndex: number;
  x: number;
  y: number;
  rotation: number;
};

export type GameContextValue = {
  controlsRef: RefObject<PlayerControls>;
  gameSpeedRef: RefObject<GameSpeed>;
  updateGameSpeed: (newSpeed: number) => void;
  spaceshipLocationRef: RefObject<SpaceshipLocation>;
};

export type GameProviderProps = {
  children: ReactNode;
};
