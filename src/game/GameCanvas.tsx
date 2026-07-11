import { useEffect, useState } from 'react';

import { Application } from '@pixi/react';

import { loadSpaceshipAssets } from '@/game/assets';
import { GAME_LAYOUT, LAYOUT_SCALE } from '@/game/constants';
import { MainScene } from '@/game/scenes';

import './pixi-setup';

export default function GameCanvas() {
  const [assetState, setAssetState] = useState<'error' | 'loading' | 'ready'>(
    'loading'
  );

  useEffect(() => {
    let isMounted = true;

    loadSpaceshipAssets()
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

  if (assetState !== 'ready') {
    return (
      <div className="game-viewport game-loading-state" style={viewportStyle}>
        {assetState === 'error' ? 'ASSET LOAD ERROR' : 'LOADING'}
      </div>
    );
  }

  return (
    <div className="game-viewport" style={viewportStyle}>
      <Application
        antialias={false}
        background={'#050714'}
        className="game-canvas"
        height={GAME_LAYOUT.Height}
        resolution={1}
        roundPixels
        width={GAME_LAYOUT.Width}
      >
        <MainScene />
      </Application>
    </div>
  );
}
