import { useCallback, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { AnimatedSprite, Container, Sprite, Ticker } from 'pixi.js';

import { GAME_LAYOUT } from '@/game/constants';
import { useGameContext } from '@/game/context';
import { clamp } from '@/game/utils';

import {
  SPACESHIP_BOUNDARY_RADIUS,
  SPACESHIP_ENGINE_OFFSET,
  SPACESHIP_FLAME_ANIMATION_SPEED,
  SPACESHIP_INITIAL_POSITION,
  SPACESHIP_MOVEMENT_SPEED,
  SPACESHIP_ROTATION_SPEED,
} from './constants';
import { useSpaceshipAnimation } from './hooks';

export function Spaceship() {
  const spaceshipRef = useRef<Container>(null);
  const hullRef = useRef<Sprite>(null);
  const flameRef = useRef<AnimatedSprite>(null);
  const headingRef = useRef(0);
  const { flameTextures, hullTexture, updateAnimation } = useSpaceshipAnimation(
    {
      flameRef,
      hullRef,
    }
  );
  const { controlsRef, spaceshipLocationRef } = useGameContext();

  const syncSpaceshipLocation = useCallback(
    (spaceship: Container) => {
      spaceshipLocationRef.current.x = spaceship.position.x;
      spaceshipLocationRef.current.y = spaceship.position.y;
      spaceshipLocationRef.current.rotation = headingRef.current;
    },
    [spaceshipLocationRef]
  );

  const setSpaceshipRef = useCallback(
    (spaceship: Container | null) => {
      if (!spaceship) {
        spaceshipRef.current = null;
        return;
      }

      spaceship.position.set(
        SPACESHIP_INITIAL_POSITION.x,
        SPACESHIP_INITIAL_POSITION.y
      );
      spaceship.rotation = 0;
      headingRef.current = 0;

      spaceshipRef.current = spaceship;
      syncSpaceshipLocation(spaceship);
    },
    [syncSpaceshipLocation]
  );

  const updateTransform = useCallback(
    (ticker: Ticker) => {
      const spaceship = spaceshipRef.current;

      if (!spaceship) {
        return;
      }

      const { left, right, up } = controlsRef.current;
      const rotationDirection = Number(right) - Number(left);

      headingRef.current +=
        rotationDirection * SPACESHIP_ROTATION_SPEED * ticker.deltaTime;
      updateAnimation(headingRef.current);

      if (!up) {
        syncSpaceshipLocation(spaceship);
        return;
      }

      const nextX =
        spaceship.position.x +
        Math.sin(headingRef.current) *
          SPACESHIP_MOVEMENT_SPEED *
          ticker.deltaTime;
      const nextY =
        spaceship.position.y -
        Math.cos(headingRef.current) *
          SPACESHIP_MOVEMENT_SPEED *
          ticker.deltaTime;

      spaceship.position.set(
        clamp(
          nextX,
          SPACESHIP_BOUNDARY_RADIUS,
          GAME_LAYOUT.Width - SPACESHIP_BOUNDARY_RADIUS
        ),
        clamp(
          nextY,
          SPACESHIP_BOUNDARY_RADIUS,
          GAME_LAYOUT.Height - SPACESHIP_BOUNDARY_RADIUS
        )
      );

      syncSpaceshipLocation(spaceship);
    },
    [controlsRef, syncSpaceshipLocation, updateAnimation]
  );

  useTick(updateTransform);

  return (
    <pixiContainer ref={setSpaceshipRef} label="spaceship">
      <pixiAnimatedSprite
        ref={flameRef}
        anchor={0.5}
        animationSpeed={SPACESHIP_FLAME_ANIMATION_SPEED}
        autoPlay
        label="spaceship-engine-flame"
        loop
        roundPixels
        textures={flameTextures}
        y={SPACESHIP_ENGINE_OFFSET}
      />
      <pixiSprite
        ref={hullRef}
        anchor={0.5}
        label="spaceship-hull"
        roundPixels
        texture={hullTexture}
      />
    </pixiContainer>
  );
}
