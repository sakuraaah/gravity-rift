import { useApplication } from "@pixi/react";
import type { Graphics } from "pixi.js";
import { useCallback } from "react";

export function Background() {
  const { app } = useApplication();

  const drawBackground = useCallback(
    (graphics: Graphics) => {
      graphics.clear();
      graphics.setFillStyle({ color: 0x050714 });
      graphics.rect(0, 0, app.screen.width, app.screen.height);
      graphics.fill();
    },
    [app.screen.height, app.screen.width],
  );

  return <pixiGraphics draw={drawBackground} />;
}
