import type { Graphics } from "pixi.js";
import { useCallback } from "react";

const PLAYER_SHIP_SIZE = 44;
const PLAYER_SHIP_POSITION = {
  x: 88,
  y: 88,
};

export function PlayerShip() {
  const drawShip = useCallback((graphics: Graphics) => {
    const halfWidth = PLAYER_SHIP_SIZE / 2;
    const halfHeight = PLAYER_SHIP_SIZE / 2;

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
      label="player-ship"
      x={PLAYER_SHIP_POSITION.x}
      y={PLAYER_SHIP_POSITION.y}
    >
      <pixiGraphics draw={drawShip} />
    </pixiContainer>
  );
}
