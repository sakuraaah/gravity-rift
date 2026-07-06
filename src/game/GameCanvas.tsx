import { Application } from '@pixi/react';

import './pixi-setup';
import { MainScene } from './scenes/MainScene';

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
