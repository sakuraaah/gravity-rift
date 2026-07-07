import { useContext } from 'react';

import { GameContext } from './GameContext';

export function useGameContext() {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    throw new Error('useGameContext must be used within GameProvider.');
  }

  return gameContext;
}
