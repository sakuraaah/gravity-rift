import { PlayerControl } from './playerControls.enums';
import type { PlayerControls } from './playerControls.types';

export const PlayerControlByKey: Partial<Record<string, keyof PlayerControls>> =
  {
    [PlayerControl.MoveUpPrimary]: 'up',
    [PlayerControl.MoveUpSecondary]: 'up',
    [PlayerControl.MoveLeftPrimary]: 'left',
    [PlayerControl.MoveLeftSecondary]: 'left',
    [PlayerControl.MoveRightPrimary]: 'right',
    [PlayerControl.MoveRightSecondary]: 'right',
  };
