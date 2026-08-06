import { useEffect, useState } from 'react';

import { Application } from '@pixi/react';

import { loadGameAssets } from '@/game/assets';
import { GAME_LAYOUT, LAYOUT_SCALE, RENDER_RESOLUTION } from '@/game/constants';
import { useScene } from '@/game/hooks';

import './pixi-setup';

export default function GameCanvas() {
  const Scene = useScene();
  const [assetState, setAssetState] = useState<'error' | 'loading' | 'ready'>(
    'loading'
  );

  useEffect(() => {
    let isMounted = true;

    loadGameAssets()
      .then(() => {
        if (isMounted) {
          setAssetState('ready');
        }
      })
      .catch(() => {
        if (isMounted) {
          setAssetState('error');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const viewportStyle = {
    height: GAME_LAYOUT.Height * LAYOUT_SCALE,
    width: GAME_LAYOUT.Width * LAYOUT_SCALE,
  };

  return assetState !== 'ready' ? (
    <div className="game-viewport game-loading-state" style={viewportStyle}>
      {assetState === 'error' ? 'ASSET LOAD ERROR' : 'LOADING'}
    </div>
  ) : (
    <div className="game-viewport" style={viewportStyle}>
      <Application
        antialias={false}
        background={'#050714'}
        className="game-canvas"
        height={GAME_LAYOUT.Height}
        resolution={RENDER_RESOLUTION}
        roundPixels
        width={GAME_LAYOUT.Width}
      >
        <Scene />
      </Application>
    </div>
  );
}
