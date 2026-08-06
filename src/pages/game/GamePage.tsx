import { useRef } from 'react';

import { PauseGame } from '@/features/pause-game';
import GameCanvas from '@/game/GameCanvas';
import { useAppStore } from '@/store';

import { GamePageRoot } from './GamePage.styles';

export function GamePage() {
  const gameSurfaceRef = useRef<HTMLElement>(null);
  const runId = useAppStore((state) => state.runId);

  return (
    <GamePageRoot ref={gameSurfaceRef} tabIndex={-1}>
      <GameCanvas key={runId} />
      <PauseGame gameSurfaceRef={gameSurfaceRef} />
    </GamePageRoot>
  );
}
