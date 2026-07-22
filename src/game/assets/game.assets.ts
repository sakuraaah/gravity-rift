import { loadAsteroidAssets } from './asteroid';
import { loadOneShotEffectAssets } from './effects';
import { loadSpaceshipAssets } from './spaceship';

export function loadGameAssets() {
  return Promise.all([
    loadSpaceshipAssets(),
    loadAsteroidAssets(),
    loadOneShotEffectAssets(),
  ]);
}
