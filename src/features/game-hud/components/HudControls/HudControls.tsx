import { HudButton } from '@/shared/ui/HudButton';
import { TypographyVariant } from '@/shared/ui/Typography';

import { HUD_CONTROL_HINTS } from './HudControls.constants';
import {
  HudControlArrowIcon,
  HudControlHint,
  HudControlLabel,
  HudControlsRoot,
} from './HudControls.styles';
import type { HudControlsProps } from './HudControls.types';
import { isHudControlActive } from './HudControls.utils';

export function HudControls({
  pressedKeys,
  pressedMouseButtons,
}: HudControlsProps) {
  return (
    <HudControlsRoot aria-label="Game controls" role="group">
      {HUD_CONTROL_HINTS.map((hint) => (
        <HudControlHint key={hint.id}>
          {hint.keys.map((key) => (
            <HudButton
              key={key.id}
              active={isHudControlActive(key, pressedKeys, pressedMouseButtons)}
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
