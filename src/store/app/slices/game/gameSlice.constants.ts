import type { GameState } from './gameSlice.types';

export const DEFAULT_BULLET_DAMAGE = 1;

export const DEFAULT_GAME_SPEED_MULTIPLIER = 1;

export const DEFAULT_PLAYER_HP = 3;

export const PLAYER_INVINCIBILITY_DURATION_MS = 5000;

export const DEFAULT_GAME_STATE = {
  bulletDamage: DEFAULT_BULLET_DAMAGE,
  gameSpeedMultiplier: DEFAULT_GAME_SPEED_MULTIPLIER,
  playerHp: DEFAULT_PLAYER_HP,
  playerInvincibleUntilGameTimeMs: 0,
} as const satisfies GameState;
