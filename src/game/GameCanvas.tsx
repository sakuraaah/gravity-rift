import { Application } from '@pixi/react';

import { MainScene } from '@/game/scenes';

import './pixi-setup';

export default function GameCanvas() {
  return (
    <Application
      antialias={false}
      background={'#050714'}
      resizeTo={window}
      resolution={window.devicePixelRatio}
    >
      <MainScene />
    </Application>
  );
}
