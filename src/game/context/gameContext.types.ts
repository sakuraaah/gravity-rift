import type { ReactNode, RefObject } from 'react';

import type { OneShotEffectRequest } from '@/game/effects';
import type { BlackHole } from '@/game/entities';
import type { CollisionWorld, PlayerActions } from '@/game/systems';

export type SpaceshipLocation = {
  facingIndex: number;
  x: number;
  y: number;
  rotation: number;
};

export type GameContextValue = {
  activeBlackHolesRef: RefObject<BlackHole[]>;
  collisionWorldRef: RefObject<CollisionWorld>;
  controlsRef: RefObject<PlayerActions>;
  gameTimeMsRef: RefObject<number>;
  pendingOneShotEffectsRef: RefObject<OneShotEffectRequest[]>;
  playOneShotEffect: (request: OneShotEffectRequest) => void;
  spaceshipLocationRef: RefObject<SpaceshipLocation>;
};

export type GameProviderProps = {
  children: ReactNode;
};
