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
          Turn with A / D or ← / →. Hold W or ↑ to thrust forward in the
          direction you are facing. Hold Space or the left mouse button over the
          game to fire. Press Escape to pause.
        </Typography>
      </HowToPlaySection>
      <HowToPlaySection>
        <Typography component="h3" variant={TypographyVariant.ControlLabel}>
          Clear the asteroid field
        </Typography>
        <Typography component="p" variant={TypographyVariant.Body}>
          Destroy asteroids to earn points and advance to faster waves. Large
          asteroids take 3 hits, medium ones 2, and small ones 1. Small
          asteroids move faster. Each collision costs one life; losing all your
          lives ends the run.
        </Typography>
      </HowToPlaySection>
      <HowToPlaySection>
        <Typography component="h3" variant={TypographyVariant.ControlLabel}>
          Watch the black holes
        </Typography>
        <Typography component="p" variant={TypographyVariant.Body}>
          Black holes start idle, then become active and pull your ship, bullets
          and asteroids inward. The pull is strongest in the danger phase, just
          before they collapse. Touching the center destroys your ship
          immediately, regardless of remaining lives. Keep your distance and
          thrust away from the pull.
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
