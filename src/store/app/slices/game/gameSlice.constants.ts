import {
  PlayerControl,
  PlayerMouseButton,
} from '@/game/systems/player-controls/playerControls.enums';
import {
  INITIAL_GAME_SPEED_MULTIPLIER,
  INITIAL_WAVE,
} from '@/game/systems/scoring/scoring.constants';

import type {
  GameState,
  PressedKeys,
  PressedMouseButtons,
} from './gameSlice.types';

export const DEFAULT_BULLET_DAMAGE = 1;

export const DEFAULT_PLAYER_HP = 3;

export const DEFAULT_SCORE = 0;

export const DEFAULT_PRESSED_KEYS = {
  [PlayerControl.ArrowLeft]: false,
  [PlayerControl.ArrowRight]: false,
  [PlayerControl.ArrowUp]: false,
  [PlayerControl.KeyA]: false,
  [PlayerControl.KeyD]: false,
  [PlayerControl.KeyW]: false,
  [PlayerControl.Space]: false,
} as const satisfies PressedKeys;

export const DEFAULT_PRESSED_MOUSE_BUTTONS = {
  [PlayerMouseButton.Left]: false,
} as const satisfies PressedMouseButtons;

export const PLAYER_INVINCIBILITY_DURATION_MS = 5000;

export const PLAYER_INVINCIBILITY_FAST_BLINK_DURATION_MS = 1000;

export const DEFAULT_GAME_STATE = {
  bulletDamage: DEFAULT_BULLET_DAMAGE,
  gameSpeedMultiplier: INITIAL_GAME_SPEED_MULTIPLIER,
  playerHp: DEFAULT_PLAYER_HP,
  playerInvincibleUntilGameTimeMs: 0,
  pressedKeys: DEFAULT_PRESSED_KEYS,
  pressedMouseButtons: DEFAULT_PRESSED_MOUSE_BUTTONS,
  score: DEFAULT_SCORE,
  wave: INITIAL_WAVE,
} as const satisfies GameState;
