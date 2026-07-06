import { useCallback } from 'react';

import type { Graphics } from 'pixi.js';

const SPACE_SHIP_SIZE = 44;
const SPACE_SHIP_POSITION = {
  x: 88,
  y: 88,
};

export function SpaceShip() {
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

  return (
    <pixiContainer
      label="space-ship"
      x={SPACE_SHIP_POSITION.x}
      y={SPACE_SHIP_POSITION.y}
    >
      <pixiGraphics draw={drawShip} />
    </pixiContainer>
  );
}
