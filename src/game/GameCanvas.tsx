import { Application } from '@pixi/react';

import { GAME_LAYOUT, LAYOUT_SCALE } from '@/game/constants';
import { MainScene } from '@/game/scenes';

import './pixi-setup';

export default function GameCanvas() {
  return (
    <div
      className="game-viewport"
      style={{
        height: GAME_LAYOUT.Height * LAYOUT_SCALE,
        width: GAME_LAYOUT.Width * LAYOUT_SCALE,
      }}
    >
      <Application
        antialias={false}
        background={'#050714'}
        className="game-canvas"
        height={GAME_LAYOUT.Height}
        resolution={1}
        width={GAME_LAYOUT.Width}
      >
        <MainScene />
      </Application>
    </div>
  );
}
