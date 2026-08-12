import { useCallback, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Texture, Ticker, TilingSprite } from 'pixi.js';

import { GAME_TICK_PRIORITY } from '@/game/systems';

import { BACKGROUND_DRIFT_PIXELS_PER_SECOND } from './background.constants';

type ParallaxLayerProps = {
  alpha?: number;
  height: number;
  isAnimated: boolean;
  label: string;
  parallax: number;
  texture: Texture;
  width: number;
};

export function ParallaxLayer({
  alpha = 1,
  height,
  isAnimated,
  label,
  parallax,
  texture,
  width,
}: ParallaxLayerProps) {
  const layerRef = useRef<TilingSprite>(null);
  const isTickEnabled = isAnimated && parallax !== 0;

  const updateParallax = useCallback(
    (ticker: Ticker) => {
      const layer = layerRef.current;

      if (!isTickEnabled || !layer) {
        return;
      }

      const deltaSeconds = ticker.deltaMS / 1000;

      layer.tilePosition.x -=
        BACKGROUND_DRIFT_PIXELS_PER_SECOND.x * parallax * deltaSeconds;
      layer.tilePosition.y -=
        BACKGROUND_DRIFT_PIXELS_PER_SECOND.y * parallax * deltaSeconds;
    },
    [isTickEnabled, parallax]
  );

  useTick({
    callback: updateParallax,
    isEnabled: isTickEnabled,
    priority: GAME_TICK_PRIORITY.BackgroundUpdate,
  });

  return (
    <pixiTilingSprite
      ref={layerRef}
      alpha={alpha}
      eventMode="none"
      height={height}
      label={label}
      texture={texture}
      width={width}
    />
  );
}
