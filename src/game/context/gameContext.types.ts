import type { ReactNode, RefObject } from 'react';

import type { CollisionWorld, PlayerActions } from '@/game/systems';

export type SpaceshipLocation = {
  facingIndex: number;
  x: number;
  y: number;
  rotation: number;
};

export type GameContextValue = {
  collisionWorldRef: RefObject<CollisionWorld>;
  controlsRef: RefObject<PlayerActions>;
  gameTimeMsRef: RefObject<number>;
  spaceshipLocationRef: RefObject<SpaceshipLocation>;
};

export type GameProviderProps = {
  children: ReactNode;
};
