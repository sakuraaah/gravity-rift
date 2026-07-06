import { useCallback, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Graphics, Ticker } from 'pixi.js';

import { usePlayerControls } from '@/game/systems';

const SPACE_SHIP_SIZE = 44;
const SPACE_SHIP_POSITION = {
  x: 88,
  y: 88,
};
const SPACE_SHIP_ROTATION_SPEED = 0.08;

export function SpaceShip() {
  const spaceShipRef = useRef<Container>(null);
  const controlsRef = usePlayerControls();

  const drawShip = useCallback((graphics: Graphics) => {
    const halfWidth = SPACE_SHIP_SIZE / 2;
    const halfHeight = SPACE_SHIP_SIZE / 2;

    graphics.clear();
    graphics.setFillStyle({ color: 0x6df7ff });
    graphics.moveTo(0, -halfHeight);
    graphics.lineTo(halfWidth, halfHeight);
    graphics.lineTo(-halfWidth, halfHeight);
    graphics.closePath();
    graphics.fill();
  }, []);

  const updateRotation = useCallback(
    (ticker: Ticker) => {
      const spaceShip = spaceShipRef.current;

      if (!spaceShip) {
        return;
      }

      const { left, right } = controlsRef.current;
      const rotationDirection = Number(right) - Number(left);

      spaceShip.rotation +=
        rotationDirection * SPACE_SHIP_ROTATION_SPEED * ticker.deltaTime;
    },
    [controlsRef]
  );

  useTick(updateRotation);

  return (
    <pixiContainer
      ref={spaceShipRef}
      label="space-ship"
      x={SPACE_SHIP_POSITION.x}
      y={SPACE_SHIP_POSITION.y}
    >
      <pixiGraphics draw={drawShip} />
    </pixiContainer>
  );
}
