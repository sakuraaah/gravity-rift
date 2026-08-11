import { useCallback, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { AnimatedSprite, Container, Sprite, Ticker } from 'pixi.js';

import { Polygon } from 'check2d';

import { GAME_LAYOUT, GAME_SCALE } from '@/game/constants';
import { useGameContext } from '@/game/context';
import {
  CollisionKind,
  GAME_TICK_PRIORITY,
  scaleHitboxPoints,
} from '@/game/systems';
import type { CollisionParticipant } from '@/game/systems';
import { DIRECTIONAL_FACING_ANGLE, clamp, getFacingIndex } from '@/game/utils';
import { GamePhase, useAppStore } from '@/store';

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
import { useSpaceshipAnimation, useSpaceshipEffects } from './hooks';

export function Spaceship() {
  const gamePhase = useAppStore((state) => state.gamePhase);
  const isVisible =
    gamePhase === GamePhase.Running || gamePhase === GamePhase.Paused;
  const entityIdRef = useRef<string | null>(null);

  if (entityIdRef.current === null) {
    entityIdRef.current = crypto.randomUUID();
  }

  const entityId = entityIdRef.current;
  const spaceshipColliderRef = useRef<Polygon<CollisionParticipant> | null>(
    null
  );
  const spaceshipRef = useRef<Container>(null);
  const hullRef = useRef<Sprite>(null);
  const flameRef = useRef<AnimatedSprite>(null);
  const particlesRef = useRef<AnimatedSprite>(null);
  const headingRef = useRef(0);
  useSpaceshipEffects(hullRef);
  const { flameTextures, hullTexture, particlesTextures, updateAnimation } =
    useSpaceshipAnimation({
      flameRef,
      hullRef,
      isPlaying: gamePhase === GamePhase.Running,
      particlesRef,
    });
  const { collisionWorldRef, controlsRef, spaceshipLocationRef } =
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

  const unregisterCollider = useCallback(() => {
    const collider = spaceshipColliderRef.current;

    if (!collider) {
      return;
    }

    const collisionWorld = collisionWorldRef.current;

    collisionWorld.unregister(collider);
    spaceshipColliderRef.current = null;
  }, [collisionWorldRef]);

  const syncCollider = useCallback(
    (spaceship: Container, facingIndex: number) => {
      const collider = spaceshipColliderRef.current;

      if (!collider) {
        return;
      }

      const collisionWorld = collisionWorldRef.current;

      collisionWorld.sync(collider, {
        angle: facingIndex * DIRECTIONAL_FACING_ANGLE,
        x: spaceship.position.x,
        y: spaceship.position.y,
      });
    },
    [collisionWorldRef]
  );

  const registerCollider = useCallback(
    (spaceship: Container, facingIndex: number) => {
      const collider = new Polygon<CollisionParticipant>(
        spaceship.position,
        scaleHitboxPoints(SPACESHIP_HITBOX_LOCAL_POINTS, GAME_SCALE)
      );
      const collisionWorld = collisionWorldRef.current;

      spaceshipColliderRef.current = collider;
      collisionWorld.register(collider, {
        id: entityId,
        kind: CollisionKind.Spaceship,
      });

      syncCollider(spaceship, facingIndex);
    },
    [collisionWorldRef, entityId, syncCollider]
  );

  const setSpaceshipRef = useCallback(
    (spaceship: Container | null) => {
      if (!spaceship) {
        unregisterCollider();
        spaceshipRef.current = null;
        return;
      }

      const initialPosition = getSpaceshipInitialPosition();

      spaceship.position.set(initialPosition.x, initialPosition.y);
      spaceship.rotation = 0;
      headingRef.current = 0;

      const facingIndex = getFacingIndex(headingRef.current);

      spaceshipRef.current = spaceship;
      registerCollider(spaceship, facingIndex);
      syncSpaceshipLocation(spaceship, facingIndex);
    },
    [registerCollider, syncSpaceshipLocation, unregisterCollider]
  );

  const updateTransform = useCallback(
    (ticker: Ticker) => {
      const spaceship = spaceshipRef.current;
      const { gamePhase, gameSpeedMultiplier } = useAppStore.getState();

      if (!spaceship || gamePhase !== GamePhase.Running) {
        return;
      }

      const { left, right, up } = controlsRef.current;
      const rotationDirection = Number(right) - Number(left);

      headingRef.current +=
        rotationDirection *
        SPACESHIP_BASE_ROTATION_SPEED *
        ticker.deltaTime *
        gameSpeedMultiplier;

      if (up) {
        const nextX =
          spaceship.position.x +
          Math.sin(headingRef.current) *
            SPACESHIP_BASE_MOVEMENT_SPEED *
            ticker.deltaTime *
            gameSpeedMultiplier;
        const nextY =
          spaceship.position.y -
          Math.cos(headingRef.current) *
            SPACESHIP_BASE_MOVEMENT_SPEED *
            ticker.deltaTime *
            gameSpeedMultiplier;

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
      syncCollider(spaceship, facingIndex);
      syncSpaceshipLocation(spaceship, facingIndex);
    },
    [controlsRef, syncCollider, syncSpaceshipLocation, updateAnimation]
  );

  useTick({
    callback: updateTransform,
    priority: GAME_TICK_PRIORITY.EntityUpdate,
  });

  return (
    <pixiContainer ref={setSpaceshipRef} label="spaceship" visible={isVisible}>
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
