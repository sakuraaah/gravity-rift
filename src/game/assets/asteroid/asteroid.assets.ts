import type { Texture } from 'pixi.js';

import { getSpritesheetTextures, loadSpritesheet } from '@/game/assets/utils';
import { AsteroidSize } from '@/game/entities/asteroid/asteroid.enums';

const ASTEROID_LARGE_ATLAS_URL = '/assets/sprites/asteroid-lg.atlas.json';
const ASTEROID_MEDIUM_ATLAS_URL = '/assets/sprites/asteroid-md.atlas.json';
const ASTEROID_SMALL_ATLAS_URL = '/assets/sprites/asteroid-sm.atlas.json';

export type AsteroidTextures = Record<AsteroidSize, readonly Texture[]>;

let asteroidTextures: AsteroidTextures | null = null;
let asteroidTexturesLoadPromise: Promise<AsteroidTextures> | null = null;

async function loadTextures(): Promise<AsteroidTextures> {
  const [largeSpritesheet, mediumSpritesheet, smallSpritesheet] =
    await Promise.all([
      loadSpritesheet(ASTEROID_LARGE_ATLAS_URL),
      loadSpritesheet(ASTEROID_MEDIUM_ATLAS_URL),
      loadSpritesheet(ASTEROID_SMALL_ATLAS_URL),
    ]);

  return {
    [AsteroidSize.Large]: getSpritesheetTextures(largeSpritesheet),
    [AsteroidSize.Medium]: getSpritesheetTextures(mediumSpritesheet),
    [AsteroidSize.Small]: getSpritesheetTextures(smallSpritesheet),
  };
}

export function loadAsteroidAssets() {
  if (asteroidTextures) {
    return Promise.resolve(asteroidTextures);
  }

  if (!asteroidTexturesLoadPromise) {
    asteroidTexturesLoadPromise = loadTextures()
      .then((textures) => {
        asteroidTextures = textures;
        return textures;
      })
      .catch((error: unknown) => {
        asteroidTexturesLoadPromise = null;
        throw error;
      });
  }

  return asteroidTexturesLoadPromise;
}

export function getLoadedAsteroidTextures() {
  if (!asteroidTextures) {
    throw new Error(
      'Asteroid assets must be loaded before rendering the game.'
    );
  }

  return asteroidTextures;
}
