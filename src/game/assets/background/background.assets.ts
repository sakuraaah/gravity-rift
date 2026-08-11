import { Assets } from 'pixi.js';
import type { Texture } from 'pixi.js';

const BACKGROUND_ASSET_URLS = {
  nebula: '/assets/background/bg_nebula-1x.png',
  planetDust: '/assets/background/bg_planet_dust-1x.png',
  starfieldBase: '/assets/background/bg_starfield_base-1x.png',
  starsDistant: '/assets/background/bg_stars_distant-1x.png',
  starsNear: '/assets/background/bg_stars_near-1x.png',
} as const;

export type BackgroundTextures = Record<
  keyof typeof BACKGROUND_ASSET_URLS,
  Texture
>;

let backgroundTextures: BackgroundTextures | null = null;
let backgroundTexturesLoadPromise: Promise<BackgroundTextures> | null = null;

async function loadTextures(): Promise<BackgroundTextures> {
  const [nebula, planetDust, starfieldBase, starsDistant, starsNear] =
    await Promise.all([
      Assets.load<Texture>(BACKGROUND_ASSET_URLS.nebula),
      Assets.load<Texture>(BACKGROUND_ASSET_URLS.planetDust),
      Assets.load<Texture>(BACKGROUND_ASSET_URLS.starfieldBase),
      Assets.load<Texture>(BACKGROUND_ASSET_URLS.starsDistant),
      Assets.load<Texture>(BACKGROUND_ASSET_URLS.starsNear),
    ]);

  const textures = {
    nebula,
    planetDust,
    starfieldBase,
    starsDistant,
    starsNear,
  };

  Object.values(textures).forEach((texture) => {
    texture.source.scaleMode = 'nearest';
  });

  return textures;
}

export function loadBackgroundAssets() {
  if (backgroundTextures) {
    return Promise.resolve(backgroundTextures);
  }

  if (!backgroundTexturesLoadPromise) {
    backgroundTexturesLoadPromise = loadTextures()
      .then((textures) => {
        backgroundTextures = textures;
        return textures;
      })
      .catch((error: unknown) => {
        backgroundTexturesLoadPromise = null;
        throw error;
      });
  }

  return backgroundTexturesLoadPromise;
}

export function getLoadedBackgroundTextures() {
  if (!backgroundTextures) {
    throw new Error(
      'Background assets must be loaded before rendering the game.'
    );
  }

  return backgroundTextures;
}
