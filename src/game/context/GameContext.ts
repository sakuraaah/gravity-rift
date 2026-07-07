import { createContext } from 'react';

import type { GameContextValue } from './gameContext.types';

export const GameContext = createContext<GameContextValue | null>(null);
