import { useRef } from 'react';

import { PauseGame } from '@/features/pause-game';
import GameCanvas from '@/game/GameCanvas';

import { GamePageRoot } from './GamePage.styles';

export function GamePage() {
  const gameSurfaceRef = useRef<HTMLElement>(null);

  return (
    <GamePageRoot ref={gameSurfaceRef} tabIndex={-1}>
      <GameCanvas />
      <PauseGame gameSurfaceRef={gameSurfaceRef} />
    </GamePageRoot>
  );
}
