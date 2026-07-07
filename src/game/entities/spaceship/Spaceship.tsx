import { useCallback, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Graphics, Ticker } from 'pixi.js';

import { usePlayerControls } from '@/game/systems';

import {
  SPACESHIP_INITIAL_POSITION,
  SPACESHIP_MOVEMENT_SPEED,
  SPACESHIP_ROTATION_SPEED,
  SPACESHIP_SIZE,
} from './constants';

export function Spaceship() {
  const spaceshipRef = useRef<Container>(null);
  const controlsRef = usePlayerControls();

  const setSpaceshipRef = useCallback((spaceship: Container | null) => {
    if (!spaceship) {
      spaceshipRef.current = null;
      return;
    }

    spaceship.position.set(
      SPACESHIP_INITIAL_POSITION.x,
      SPACESHIP_INITIAL_POSITION.y
    );

    spaceshipRef.current = spaceship;
  }, []);

  const drawShip = useCallback((graphics: Graphics) => {
    const halfWidth = SPACESHIP_SIZE / 2;
    const halfHeight = SPACESHIP_SIZE / 2;

    graphics.clear();
    graphics.setFillStyle({ color: 0x6df7ff });
    graphics.moveTo(0, -halfHeight);
    graphics.lineTo(halfWidth, halfHeight);
    graphics.lineTo(-halfWidth, halfHeight);
    graphics.closePath();
    graphics.fill();
  }, []);

  const updateTransform = useCallback(
    (ticker: Ticker) => {
      const spaceship = spaceshipRef.current;

      if (!spaceship) {
        return;
      }

      const { left, right, up } = controlsRef.current;
      const rotationDirection = Number(right) - Number(left);

      spaceship.rotation +=
        rotationDirection * SPACESHIP_ROTATION_SPEED * ticker.deltaTime;

      if (!up) {
        return;
      }

      const nextX =
        spaceship.position.x +
        Math.sin(spaceship.rotation) *
          SPACESHIP_MOVEMENT_SPEED *
          ticker.deltaTime;
      const nextY =
        spaceship.position.y -
        Math.cos(spaceship.rotation) *
          SPACESHIP_MOVEMENT_SPEED *
          ticker.deltaTime;

      spaceship.position.set(nextX, nextY);
    },
    [controlsRef]
  );

  useTick(updateTransform);

  return (
    <pixiContainer ref={setSpaceshipRef} label="spaceship">
      <pixiGraphics draw={drawShip} />
    </pixiContainer>
  );
}
