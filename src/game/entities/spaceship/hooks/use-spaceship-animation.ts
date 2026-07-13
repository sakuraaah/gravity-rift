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
  particlesRef: RefObject<AnimatedSprite | null>;
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
  particlesRef,
}: UseSpaceshipAnimationOptions) {
  const textures = getLoadedSpaceshipTextures();
  const facingIndexRef = useRef(0);

  const updateAnimation = useCallback(
    (rotation: number) => {
      const hull = hullRef.current;
      const flame = flameRef.current;
      const particles = particlesRef.current;

      if (!hull || !flame || !particles) {
        return;
      }

      const facingIndex = getFacingIndex(rotation);

      if (facingIndex !== facingIndexRef.current) {
        facingIndexRef.current = facingIndex;
        hull.texture = textures.hull[facingIndex]!;
        flame.textures = textures.flame[facingIndex]!;
        flame.gotoAndPlay(flame.currentFrame % flame.totalFrames);
        particles.textures = textures.particles[facingIndex]!;
        particles.gotoAndPlay(particles.currentFrame % particles.totalFrames);

        const snappedHeading = facingIndex * FACING_ANGLE;
        const flameX = -Math.sin(snappedHeading) * SPACESHIP_ENGINE_OFFSET;
        const flameY = Math.cos(snappedHeading) * SPACESHIP_ENGINE_OFFSET;

        flame.position.set(flameX, flameY);
        particles.position.set(flameX, flameY);
      }
    },
    [flameRef, hullRef, particlesRef, textures]
  );

  return {
    flameTextures: textures.flame[0]!,
    hullTexture: textures.hull[0]!,
    particlesTextures: textures.particles[0]!,
    updateAnimation,
  };
}
