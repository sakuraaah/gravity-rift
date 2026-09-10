import type { RefObject } from 'react';

import { MainMenu } from '@/features/main-menu';
import { GameOverlay } from '@/widgets/game-overlay';

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
