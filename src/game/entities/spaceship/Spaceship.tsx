import { useCallback, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { AnimatedSprite, Container, Sprite, Ticker } from 'pixi.js';

import { Polygon } from 'check2d';

import { GAME_LAYOUT, GAME_SCALE } from '@/game/constants';
import { useGameContext } from '@/game/context';
import {
  CollisionKind,
  GAME_TICK_PRIORITY,
  calculateBlackHoleGravityAcceleration,
  scaleHitboxPoints,
} from '@/game/systems';
import type { CollisionParticipant } from '@/game/systems';
import {
  DIRECTIONAL_FACING_COUNT,
  clamp,
  getRotationByFacingIndex,
} from '@/game/utils';
import type { Vector2 } from '@/game/utils';
import { GamePhase, useAppStore } from '@/store';

import {
  SPACESHIP_BASE_MOVEMENT_SPEED,
  SPACESHIP_BOUNDARY_RADIUS,
  SPACESHIP_ENGINE_OFFSET,
  SPACESHIP_FLAME_ANIMATION_SPEED,
  SPACESHIP_GRAVITY_VELOCITY_RETENTION_PER_TICK,
  SPACESHIP_HITBOX_LOCAL_POINTS,
  SPACESHIP_PARTICLES_ANIMATION_SPEED,
  SPACESHIP_TURN_INTERVAL_MS,
  getSpaceshipInitialPosition,
} from './constants';
import { useSpaceshipAnimation, useSpaceshipEffects } from './hooks';

export function Spaceship() {
  const gamePhase = useAppStore((state) => state.gamePhase);
  const isVisible =
    gamePhase === GamePhase.Running ||
    gamePhase === GamePhase.Paused ||
    gamePhase === GamePhase.HowToPlay;
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
  const facingIndexRef = useRef(0);
  const nextTurnAtGameTimeMsRef = useRef<number | null>(null);
  const gravityVelocityRef = useRef<Vector2>({ x: 0, y: 0 });
  useSpaceshipEffects(hullRef);
  const { flameTextures, hullTexture, particlesTextures, updateAnimation } =
    useSpaceshipAnimation({
      flameRef,
      hullRef,
      isPlaying: gamePhase === GamePhase.Running,
      particlesRef,
    });
  const {
    activeBlackHolesRef,
    collisionWorldRef,
    controlsRef,
    gameTimeMsRef,
    spaceshipLocationRef,
  } = useGameContext();

  const syncSpaceshipLocation = useCallback(
    (spaceship: Container) => {
      spaceshipLocationRef.current.facingIndex = facingIndexRef.current;
      spaceshipLocationRef.current.x = spaceship.position.x;
      spaceshipLocationRef.current.y = spaceship.position.y;
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
    (spaceship: Container) => {
      const collider = spaceshipColliderRef.current;

      if (!collider) {
        return;
      }

      const collisionWorld = collisionWorldRef.current;

      collisionWorld.sync(collider, {
        angle: getRotationByFacingIndex(facingIndexRef.current),
        x: spaceship.position.x,
        y: spaceship.position.y,
      });
    },
    [collisionWorldRef]
  );

  const registerCollider = useCallback(
    (spaceship: Container) => {
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

      syncCollider(spaceship);
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
      facingIndexRef.current = 0;
      nextTurnAtGameTimeMsRef.current = null;
      gravityVelocityRef.current = { x: 0, y: 0 };

      spaceshipRef.current = spaceship;
      registerCollider(spaceship);
      syncSpaceshipLocation(spaceship);
    },
    [registerCollider, syncSpaceshipLocation, unregisterCollider]
  );

  const updateFacingIndex = useCallback(
    (left: boolean, right: boolean, gameSpeedMultiplier: number) => {
      const rotationDirection = Number(right) - Number(left);

      if (rotationDirection === 0) {
        nextTurnAtGameTimeMsRef.current = null;
        return;
      }

      const gameTimeMs = gameTimeMsRef.current;
      const nextTurnAtGameTimeMs = nextTurnAtGameTimeMsRef.current;
      const canTurn =
        nextTurnAtGameTimeMs === null || gameTimeMs >= nextTurnAtGameTimeMs;

      if (!canTurn) {
        return;
      }

      facingIndexRef.current =
        (facingIndexRef.current +
          rotationDirection +
          DIRECTIONAL_FACING_COUNT) %
        DIRECTIONAL_FACING_COUNT;

      nextTurnAtGameTimeMsRef.current =
        gameTimeMs + SPACESHIP_TURN_INTERVAL_MS / gameSpeedMultiplier;
    },
    [gameTimeMsRef]
  );

  const updateTransform = useCallback(
    (ticker: Ticker) => {
      const spaceship = spaceshipRef.current;
      const { gamePhase, gameSpeedMultiplier } = useAppStore.getState();

      if (!spaceship || gamePhase !== GamePhase.Running) {
        return;
      }

      const { left, right, up } = controlsRef.current;

      updateFacingIndex(left, right, gameSpeedMultiplier);

      const rotation = getRotationByFacingIndex(facingIndexRef.current);

      let nextX =
        spaceship.position.x +
        gravityVelocityRef.current.x * ticker.deltaTime * gameSpeedMultiplier;
      let nextY =
        spaceship.position.y +
        gravityVelocityRef.current.y * ticker.deltaTime * gameSpeedMultiplier;

      if (up) {
        nextX +=
          Math.sin(rotation) *
          SPACESHIP_BASE_MOVEMENT_SPEED *
          ticker.deltaTime *
          gameSpeedMultiplier;
        nextY -=
          Math.cos(rotation) *
          SPACESHIP_BASE_MOVEMENT_SPEED *
          ticker.deltaTime *
          gameSpeedMultiplier;
      }

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

      updateAnimation(facingIndexRef.current);
      syncCollider(spaceship);
      syncSpaceshipLocation(spaceship);
    },
    [
      controlsRef,
      syncCollider,
      syncSpaceshipLocation,
      updateAnimation,
      updateFacingIndex,
    ]
  );

  const updateGravity = useCallback(
    (ticker: Ticker) => {
      const spaceship = spaceshipRef.current;
      const { gamePhase, gameSpeedMultiplier } = useAppStore.getState();

      if (!spaceship || gamePhase !== GamePhase.Running) {
        return;
      }

      const { acceleration, isInfluenced } =
        calculateBlackHoleGravityAcceleration(
          spaceship.position,
          activeBlackHolesRef.current
        );

      const gravityVelocity = gravityVelocityRef.current;

      if (!isInfluenced) {
        const gravityVelocityRetention =
          SPACESHIP_GRAVITY_VELOCITY_RETENTION_PER_TICK **
          (ticker.deltaTime * gameSpeedMultiplier);

        gravityVelocity.x *= gravityVelocityRetention;
        gravityVelocity.y *= gravityVelocityRetention;
      }

      gravityVelocity.x +=
        acceleration.x * ticker.deltaTime * gameSpeedMultiplier;
      gravityVelocity.y +=
        acceleration.y * ticker.deltaTime * gameSpeedMultiplier;
    },
    [activeBlackHolesRef]
  );

  useTick({
    callback: updateGravity,
    priority: GAME_TICK_PRIORITY.GravityUpdate,
  });

  useTick({
    callback: updateTransform,
    priority: GAME_TICK_PRIORITY.SpaceshipUpdate,
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
