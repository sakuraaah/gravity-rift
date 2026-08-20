import type { ArrowIconDirection } from '@/shared/icons';
import { HudButton } from '@/shared/ui/HudButton';
import { TypographyVariant } from '@/shared/ui/Typography';

import {
  HudControlArrowIcon,
  HudControlHint,
  HudControlLabel,
  HudControlsRoot,
} from './HudControls.styles';

type HudControlHintConfig = {
  id: string;
  keys: readonly {
    ariaLabel: string;
    content:
      | { direction: ArrowIconDirection; kind: 'arrow' }
      | { kind: 'text'; value: string };
    id: string;
    wide?: boolean;
  }[];
  label: string;
};

const HUD_CONTROL_HINTS = [
  {
    id: 'rotate',
    keys: [
      {
        ariaLabel: 'Rotate left',
        content: { direction: 'left', kind: 'arrow' },
        id: 'left',
      },
      {
        ariaLabel: 'Rotate right',
        content: { direction: 'right', kind: 'arrow' },
        id: 'right',
      },
    ],
    label: 'Rotate',
  },
  {
    id: 'thrust',
    keys: [
      {
        ariaLabel: 'Thrust',
        content: { direction: 'up', kind: 'arrow' },
        id: 'up',
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
        id: 'space',
        wide: true,
      },
      {
        ariaLabel: 'Fire with left mouse button',
        content: { kind: 'text', value: 'LMB' },
        id: 'left-mouse-button',
      },
    ],
    label: 'Fire',
  },
] as const satisfies readonly HudControlHintConfig[];

export function HudControls() {
  return (
    <HudControlsRoot aria-label="Game controls" role="group">
      {HUD_CONTROL_HINTS.map((hint) => (
        <HudControlHint key={hint.id}>
          {hint.keys.map((key) => (
            <HudButton
              key={key.id}
              active={false}
              aria-label={key.ariaLabel}
              size="small"
              wide={'wide' in key && key.wide}
            >
              {key.content.kind === 'arrow' ? (
                <HudControlArrowIcon direction={key.content.direction} />
              ) : (
                key.content.value
              )}
            </HudButton>
          ))}

          <HudControlLabel variant={TypographyVariant.HudLabel}>
            {hint.label}
          </HudControlLabel>
        </HudControlHint>
      ))}
    </HudControlsRoot>
  );
}
