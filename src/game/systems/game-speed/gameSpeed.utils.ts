import { GAME_SPEED_INITIAL_MULTIPLIER } from './gameSpeed.constants';
import type { GameSpeed } from './gameSpeed.types';

export function createInitialGameSpeed(): GameSpeed {
  return {
    multiplier: GAME_SPEED_INITIAL_MULTIPLIER,
  };
}

export function updateGameSpeed(gameSpeed: GameSpeed, newSpeed: number): void {
  gameSpeed.multiplier = newSpeed;
}
