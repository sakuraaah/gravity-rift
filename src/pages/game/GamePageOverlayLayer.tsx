import type { RefObject } from 'react';

import { GameOverlay } from '@/features/game-overlay';
import { MainMenu } from '@/features/main-menu';

type GamePageOverlayLayerProps = {
  gameSurfaceRef: RefObject<HTMLElement | null>;
};

export function GamePageOverlayLayer({
  gameSurfaceRef,
}: GamePageOverlayLayerProps) {
  return (
    <>
      <MainMenu gameSurfaceRef={gameSurfaceRef} />
      <GameOverlay gameSurfaceRef={gameSurfaceRef} />
    </>
  );
}
