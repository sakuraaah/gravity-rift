import { useCallback } from 'react';

import { useApplication } from '@pixi/react';

import type { Graphics } from 'pixi.js';

import { getLoadedBackgroundTextures } from '@/game/assets';

import { ParallaxLayer } from './ParallaxLayer';
import {
  BACKGROUND_LAYERS,
  BACKGROUND_SCRIM_ALPHA,
  BACKGROUND_SCRIM_COLOR,
} from './background.constants';

type BackgroundProps = {
  isAnimated: boolean;
};

export function Background({ isAnimated }: BackgroundProps) {
  const { app } = useApplication();
  const textures = getLoadedBackgroundTextures();
  const backgroundHeight = app.screen.height;
  const backgroundWidth = app.screen.width;

  const drawScrim = useCallback(
    (graphics: Graphics) => {
      graphics.clear();
      graphics.setFillStyle({
        alpha: BACKGROUND_SCRIM_ALPHA,
        color: BACKGROUND_SCRIM_COLOR,
      });
      graphics.rect(0, 0, backgroundWidth, backgroundHeight);
      graphics.fill();
    },
    [backgroundHeight, backgroundWidth]
  );

  return (
    <pixiContainer label="background-layer">
      {BACKGROUND_LAYERS.map((layer) => (
        <ParallaxLayer
          key={layer.texture}
          alpha={layer.alpha}
          height={backgroundHeight}
          isAnimated={isAnimated}
          label={`background-${layer.texture}`}
          parallax={layer.parallax}
          texture={textures[layer.texture]}
          width={backgroundWidth}
        />
      ))}
      <pixiGraphics
        draw={drawScrim}
        eventMode="none"
        label="background-dimming-scrim"
      />
    </pixiContainer>
  );
}
