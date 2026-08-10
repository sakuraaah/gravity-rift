import { useRef } from 'react';

import GameCanvas from '@/game/GameCanvas';
import { useAppStore } from '@/store';

import { GamePageRoot } from './GamePage.styles';
import { GamePageOverlayLayer } from './GamePageOverlayLayer';

export function GamePage() {
  const gameSurfaceRef = useRef<HTMLElement>(null);
  const runId = useAppStore((state) => state.runId);

  return (
    <GamePageRoot ref={gameSurfaceRef} tabIndex={-1}>
      <GameCanvas key={runId} />
      <GamePageOverlayLayer gameSurfaceRef={gameSurfaceRef} />
    </GamePageRoot>
  );
}
