import { GameOverlayControls } from '@/features/game-overlay/GameOverlay.styles';
import { PixelButton, Typography, TypographyVariant } from '@/shared/ui';

import { HowToPlayBody, HowToPlaySection } from './HowToPlayContent.styles';
import type { HowToPlayContentProps } from './HowToPlayContent.types';

export function HowToPlayContent({ onConfirm }: HowToPlayContentProps) {
  return (
    <HowToPlayBody>
      <HowToPlaySection>
        <Typography component="h3" variant={TypographyVariant.ControlLabel}>
          Pilot your ship
        </Typography>
        <Typography component="p" variant={TypographyVariant.Body}>
          A and D or Left and Right: turn. W or Up: thrust.
          <br />
          Space or left click: fire. Esc: pause.
        </Typography>
      </HowToPlaySection>
      <HowToPlaySection>
        <Typography component="h3" variant={TypographyVariant.ControlLabel}>
          Clear the asteroid field
        </Typography>
        <Typography component="p" variant={TypographyVariant.Body}>
          Shoot for points and faster waves. Hits: large 3, medium 2, small 1.
          Collisions cost a life.
        </Typography>
      </HowToPlaySection>
      <HowToPlaySection>
        <Typography component="h3" variant={TypographyVariant.ControlLabel}>
          Watch the black holes
        </Typography>
        <Typography component="p" variant={TypographyVariant.Body}>
          Active holes pull everything inward. Thrust away: touching the center
          ends your run instantly.
        </Typography>
      </HowToPlaySection>
      <GameOverlayControls>
        <PixelButton fullWidth variant="primary" onClick={onConfirm}>
          OK, got it
        </PixelButton>
      </GameOverlayControls>
    </HowToPlayBody>
  );
}
