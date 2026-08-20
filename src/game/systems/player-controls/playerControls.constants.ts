import { PlayerControl, PlayerMouseButton } from './playerControls.enums';
import type { PlayerActions } from './playerControls.types';

export const DEFAULT_PLAYER_ACTIONS = {
  fire: false,
  left: false,
  right: false,
  up: false,
} as const satisfies PlayerActions;

export const PLAYER_CONTROL_BY_KEY: Readonly<
  Partial<Record<string, keyof PlayerActions>>
> = {
  [PlayerControl.ArrowLeft]: 'left',
  [PlayerControl.ArrowRight]: 'right',
  [PlayerControl.ArrowUp]: 'up',
  [PlayerControl.KeyA]: 'left',
  [PlayerControl.KeyD]: 'right',
  [PlayerControl.KeyW]: 'up',
  [PlayerControl.Space]: 'fire',
};

export const PLAYER_CONTROL_BY_MOUSE_BUTTON: Readonly<
  Partial<Record<number, keyof PlayerActions>>
> = {
  [PlayerMouseButton.Left]: 'fire',
};
