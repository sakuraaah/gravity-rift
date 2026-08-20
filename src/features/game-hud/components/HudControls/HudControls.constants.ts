import {
  PlayerControl,
  PlayerMouseButton,
} from '@/game/systems/player-controls';

import type { HudControlHintConfig } from './HudControls.types';

export const HUD_CONTROL_HINTS = [
  {
    id: 'rotate',
    keys: [
      {
        alternativeIds: [PlayerControl.KeyA],
        ariaLabel: 'Rotate left',
        content: { direction: 'left', kind: 'arrow' },
        id: PlayerControl.ArrowLeft,
      },
      {
        alternativeIds: [PlayerControl.KeyD],
        ariaLabel: 'Rotate right',
        content: { direction: 'right', kind: 'arrow' },
        id: PlayerControl.ArrowRight,
      },
    ],
    label: 'Rotate',
  },
  {
    id: 'thrust',
    keys: [
      {
        alternativeIds: [PlayerControl.KeyW],
        ariaLabel: 'Thrust',
        content: { direction: 'up', kind: 'arrow' },
        id: PlayerControl.ArrowUp,
      },
    ],
    label: 'Thrust',
  },
  {
    id: 'fire',
    keys: [
      {
        ariaLabel: 'Fire',
        content: { kind: 'text', value: 'Space' },
        id: PlayerControl.Space,
        wide: true,
      },
      {
        ariaLabel: 'Fire with left mouse button',
        content: { kind: 'text', value: 'LMB' },
        id: PlayerMouseButton.Left,
      },
    ],
    label: 'Fire',
  },
] as const satisfies readonly HudControlHintConfig[];
