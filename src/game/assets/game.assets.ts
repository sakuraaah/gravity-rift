import { loadAsteroidAssets } from './asteroid';
import { loadSpaceshipAssets } from './spaceship';

export function loadGameAssets() {
  return Promise.all([loadSpaceshipAssets(), loadAsteroidAssets()]);
}
