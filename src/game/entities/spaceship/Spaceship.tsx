import { useCallback, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { AnimatedSprite, Container, Sprite, Ticker } from 'pixi.js';

import { Polygon } from 'check2d';

import { GAME_LAYOUT, GAME_SCALE } from '@/game/constants';
import { useGameContext } from '@/game/context';
import { CollisionKind, scaleHitboxPoints } from '@/game/systems';
import type { CollisionParticipant } from '@/game/systems';
import { DIRECTIONAL_FACING_ANGLE, clamp, getFacingIndex } from '@/game/utils';

import {
  SPACESHIP_BASE_MOVEMENT_SPEED,
  SPACESHIP_BASE_ROTATION_SPEED,
  SPACESHIP_BOUNDARY_RADIUS,
  SPACESHIP_ENGINE_OFFSET,
  SPACESHIP_FLAME_ANIMATION_SPEED,
  SPACESHIP_HITBOX_LOCAL_POINTS,
  SPACESHIP_PARTICLES_ANIMATION_SPEED,
  getSpaceshipInitialPosition,
} from './constants';
import { useSpaceshipAnimation } from './hooks';

export function Spaceship() {
  const spaceshipColliderRef = useRef<Polygon<CollisionParticipant> | null>(
    null
  );
  const spaceshipRef = useRef<Container>(null);
  const hullRef = useRef<Sprite>(null);
  const flameRef = useRef<AnimatedSprite>(null);
  const particlesRef = useRef<AnimatedSprite>(null);
  const headingRef = useRef(0);
  const { flameTextures, hullTexture, particlesTextures, updateAnimation } =
    useSpaceshipAnimation({
      flameRef,
      hullRef,
      particlesRef,
    });
  const { collisionWorldRef, controlsRef, gameSpeedRef, spaceshipLocationRef } =
    useGameContext();

  const syncSpaceshipLocation = useCallback(
    (spaceship: Container, facingIndex: number) => {
      spaceshipLocationRef.current.x = spaceship.position.x;
      spaceshipLocationRef.current.y = spaceship.position.y;
      spaceshipLocationRef.current.rotation = headingRef.current;
      spaceshipLocationRef.current.facingIndex = facingIndex;
    },
    [spaceshipLocationRef]
  );

  const setSpaceshipRef = useCallback(
    (spaceship: Container | null) => {
      if (!spaceship) {
        const collider = spaceshipColliderRef.current;

        if (collider) {
          collisionWorldRef.current.unregister(collider);
          spaceshipColliderRef.current = null;
        }

        spaceshipRef.current = null;
        return;
      }

      const initialPosition = getSpaceshipInitialPosition();

      spaceship.position.set(initialPosition.x, initialPosition.y);
      spaceship.rotation = 0;
      headingRef.current = 0;

      const facingIndex = getFacingIndex(headingRef.current);
      const collider = new Polygon<CollisionParticipant>(
        initialPosition,
        scaleHitboxPoints(SPACESHIP_HITBOX_LOCAL_POINTS, GAME_SCALE)
      );

      spaceshipColliderRef.current = collisionWorldRef.current.register(
        collider,
        {
          id: 'spaceship',
          kind: CollisionKind.Spaceship,
        }
      );

      spaceshipRef.current = spaceship;
      syncSpaceshipLocation(spaceship, facingIndex);
    },
    [collisionWorldRef, syncSpaceshipLocation]
  );

  const syncSpaceshipCollider = useCallback(
    (spaceship: Container, facingIndex: number) => {
      const collider = spaceshipColliderRef.current;

      if (!collider) {
        return;
      }

      collisionWorldRef.current.sync(collider, {
        angle: facingIndex * DIRECTIONAL_FACING_ANGLE,
        x: spaceship.position.x,
        y: spaceship.position.y,
      });
    },
    [collisionWorldRef]
  );

  const updateTransform = useCallback(
    (ticker: Ticker) => {
      const spaceship = spaceshipRef.current;

      if (!spaceship) {
        return;
      }

      const { left, right, up } = controlsRef.current;
      const rotationDirection = Number(right) - Number(left);
      const speedMultiplier = gameSpeedRef.current.multiplier;

      headingRef.current +=
        rotationDirection *
        SPACESHIP_BASE_ROTATION_SPEED *
        ticker.deltaTime *
        speedMultiplier;

      if (up) {
        const nextX =
          spaceship.position.x +
          Math.sin(headingRef.current) *
            SPACESHIP_BASE_MOVEMENT_SPEED *
            ticker.deltaTime *
            speedMultiplier;
        const nextY =
          spaceship.position.y -
          Math.cos(headingRef.current) *
            SPACESHIP_BASE_MOVEMENT_SPEED *
            ticker.deltaTime *
            speedMultiplier;

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
      }

      const facingIndex = getFacingIndex(headingRef.current);

      updateAnimation(facingIndex);
      syncSpaceshipCollider(spaceship, facingIndex);
      syncSpaceshipLocation(spaceship, facingIndex);
    },
    [
      controlsRef,
      gameSpeedRef,
      syncSpaceshipCollider,
      syncSpaceshipLocation,
      updateAnimation,
    ]
  );

  useTick(updateTransform);

  return (
    <pixiContainer ref={setSpaceshipRef} label="spaceship">
      <pixiAnimatedSprite
        ref={particlesRef}
        anchor={0.5}
        animationSpeed={SPACESHIP_PARTICLES_ANIMATION_SPEED}
        label="spaceship-engine-particles"
        loop
        roundPixels
        scale={GAME_SCALE}
        textures={particlesTextures}
        y={SPACESHIP_ENGINE_OFFSET}
      />
      <pixiAnimatedSprite
        ref={flameRef}
        anchor={0.5}
        animationSpeed={SPACESHIP_FLAME_ANIMATION_SPEED}
        label="spaceship-engine-flame"
        loop
        roundPixels
        scale={GAME_SCALE}
        textures={flameTextures}
        y={SPACESHIP_ENGINE_OFFSET}
      />
      <pixiSprite
        ref={hullRef}
        anchor={0.5}
        label="spaceship-hull"
        roundPixels
        scale={GAME_SCALE}
        texture={hullTexture}
      />
    </pixiContainer>
  );
}
