import type { ReactNode, RefObject } from 'react';

import type { PlayerControls } from '@/game/systems';

export type SpaceshipLocation = {
  x: number;
  y: number;
  rotation: number;
};

export type GameContextValue = {
  controlsRef: RefObject<PlayerControls>;
  spaceshipLocationRef: RefObject<SpaceshipLocation>;
};

export type GameProviderProps = {
  children: ReactNode;
};
