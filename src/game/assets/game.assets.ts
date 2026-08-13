import { loadAsteroidAssets } from './asteroid';
import { loadBackgroundAssets } from './background';
import { loadBlackHoleAssets } from './black-hole';
import { loadBulletAssets } from './bullet';
import { loadOneShotEffectAssets } from './effects';
import { loadSpaceshipAssets } from './spaceship';

export function loadGameAssets() {
  return Promise.all([
    loadSpaceshipAssets(),
    loadAsteroidAssets(),
    loadBlackHoleAssets(),
    loadBulletAssets(),
    loadOneShotEffectAssets(),
    loadBackgroundAssets(),
  ]);
}
