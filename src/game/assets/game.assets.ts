import { loadAsteroidAssets } from './asteroid';
import { loadBackgroundAssets } from './background';
import { loadBulletAssets } from './bullet';
import { loadOneShotEffectAssets } from './effects';
import { loadSpaceshipAssets } from './spaceship';

export function loadGameAssets() {
  return Promise.all([
    loadSpaceshipAssets(),
    loadAsteroidAssets(),
    loadBulletAssets(),
    loadOneShotEffectAssets(),
    loadBackgroundAssets(),
  ]);
}
