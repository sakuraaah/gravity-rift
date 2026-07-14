import { useCallback, useRef } from 'react';
import type { RefObject } from 'react';

import type { AnimatedSprite, Sprite } from 'pixi.js';

import { getLoadedSpaceshipTextures } from '@/game/assets';
import { SPACESHIP_ENGINE_OFFSET } from '@/game/entities/spaceship/constants';
import { DIRECTIONAL_FACING_ANGLE } from '@/game/utils';

interface UseSpaceshipAnimationOptions {
  flameRef: RefObject<AnimatedSprite | null>;
  hullRef: RefObject<Sprite | null>;
  particlesRef: RefObject<AnimatedSprite | null>;
}

export function useSpaceshipAnimation({
  flameRef,
  hullRef,
  particlesRef,
}: UseSpaceshipAnimationOptions) {
  const textures = getLoadedSpaceshipTextures();
  const facingIndexRef = useRef<number | null>(null);

  const updateAnimation = useCallback(
    (facingIndex: number) => {
      const hull = hullRef.current;
      const flame = flameRef.current;
      const particles = particlesRef.current;

      if (!hull || !flame || !particles) {
        return;
      }

      if (facingIndex !== facingIndexRef.current) {
        facingIndexRef.current = facingIndex;
        hull.texture = textures.hull[facingIndex]!;
        flame.textures = textures.flame[facingIndex]!;
        flame.gotoAndPlay(flame.currentFrame % flame.totalFrames);
        particles.textures = textures.particles[facingIndex]!;
        particles.gotoAndPlay(particles.currentFrame % particles.totalFrames);

        const snappedHeading = facingIndex * DIRECTIONAL_FACING_ANGLE;
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
