import { useCallback, useRef } from 'react';
import type { RefObject } from 'react';

import type { AnimatedSprite, Sprite } from 'pixi.js';

import { getLoadedSpaceshipTextures } from '@/game/assets';
import {
  SPACESHIP_ENGINE_OFFSET,
  SPACESHIP_FACING_COUNT,
} from '@/game/entities/spaceship/constants';

const FULL_ROTATION = Math.PI * 2;
const FACING_ANGLE = FULL_ROTATION / SPACESHIP_FACING_COUNT;

interface UseSpaceshipAnimationOptions {
  flameRef: RefObject<AnimatedSprite | null>;
  hullRef: RefObject<Sprite | null>;
}

function normalizeRotation(rotation: number) {
  return ((rotation % FULL_ROTATION) + FULL_ROTATION) % FULL_ROTATION;
}

function getFacingIndex(rotation: number) {
  return (
    Math.round(normalizeRotation(rotation) / FACING_ANGLE) %
    SPACESHIP_FACING_COUNT
  );
}

export function useSpaceshipAnimation({
  flameRef,
  hullRef,
}: UseSpaceshipAnimationOptions) {
  const textures = getLoadedSpaceshipTextures();
  const facingIndexRef = useRef(0);

  const updateAnimation = useCallback(
    (rotation: number) => {
      const hull = hullRef.current;
      const flame = flameRef.current;

      if (!hull || !flame) {
        return;
      }

      const facingIndex = getFacingIndex(rotation);

      if (facingIndex !== facingIndexRef.current) {
        facingIndexRef.current = facingIndex;
        hull.texture = textures.hull[facingIndex]!;
        flame.textures = textures.flame[facingIndex]!;
        flame.gotoAndPlay(flame.currentFrame % flame.totalFrames);

        const snappedHeading = facingIndex * FACING_ANGLE;

        flame.position.set(
          -Math.sin(snappedHeading) * SPACESHIP_ENGINE_OFFSET,
          Math.cos(snappedHeading) * SPACESHIP_ENGINE_OFFSET
        );
      }
    },
    [flameRef, hullRef, textures]
  );

  return {
    flameTextures: textures.flame[0]!,
    hullTexture: textures.hull[0]!,
    updateAnimation,
  };
}
