import { PlayerControl, PlayerMouseButton } from './playerControls.enums';
import type { PlayerControls } from './playerControls.types';

export const PlayerControlByKey: Partial<Record<string, keyof PlayerControls>> =
  {
    [PlayerControl.Fire]: 'fire',
    [PlayerControl.MoveUpPrimary]: 'up',
    [PlayerControl.MoveUpSecondary]: 'up',
    [PlayerControl.MoveLeftPrimary]: 'left',
    [PlayerControl.MoveLeftSecondary]: 'left',
    [PlayerControl.MoveRightPrimary]: 'right',
    [PlayerControl.MoveRightSecondary]: 'right',
  };

export const PlayerControlByMouseButton: Partial<
  Record<number, keyof PlayerControls>
> = {
  [PlayerMouseButton.Fire]: 'fire',
};
