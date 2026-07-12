import { Assets, Rectangle, Texture } from 'pixi.js';

import { ASTEROID_SIZE } from '@/game/entities/asteroid/asteroid.enums';
import type { AsteroidSize } from '@/game/entities/asteroid/asteroid.enums';

type AsteroidTextureConfig = {
  frameCount: number;
  frameSize: number;
  url: string;
};

const ASTEROID_TEXTURE_CONFIG_BY_SIZE: Record<
  AsteroidSize,
  AsteroidTextureConfig
> = {
  [ASTEROID_SIZE.Large]: {
    frameCount: 4,
    frameSize: 24,
    url: '/assets/sprites/asteroid_lg-1x.png',
  },
  [ASTEROID_SIZE.Medium]: {
    frameCount: 4,
    frameSize: 16,
    url: '/assets/sprites/asteroid_md-1x.png',
  },
  [ASTEROID_SIZE.Small]: {
    frameCount: 3,
    frameSize: 8,
    url: '/assets/sprites/asteroid_sm-1x.png',
  },
};

export type AsteroidTextures = Record<AsteroidSize, readonly Texture[]>;

let asteroidTextures: AsteroidTextures | null = null;
let asteroidTexturesLoadPromise: Promise<AsteroidTextures> | null = null;

function createStaticTextures(
  sourceTexture: Texture,
  size: AsteroidSize,
  config: AsteroidTextureConfig
) {
  sourceTexture.source.scaleMode = 'nearest';

  return Array.from({ length: config.frameCount }, (_, frameIndex) => {
    const frameOffset = frameIndex * (config.frameSize + 1);

    return new Texture({
      defaultAnchor: { x: 0.5, y: 0.5 },
      frame: new Rectangle(frameOffset, 0, config.frameSize, config.frameSize),
      label: `asteroid-${size}-${frameIndex}`,
      source: sourceTexture.source,
    });
  });
}

async function loadTextures(): Promise<AsteroidTextures> {
  const sizes = Object.values(ASTEROID_SIZE);
  const sourceTextures = await Promise.all(
    sizes.map((size) =>
      Assets.load<Texture>(ASTEROID_TEXTURE_CONFIG_BY_SIZE[size].url)
    )
  );

  return sizes.reduce((textures, size, index) => {
    textures[size] = createStaticTextures(
      sourceTextures[index],
      size,
      ASTEROID_TEXTURE_CONFIG_BY_SIZE[size]
    );
    return textures;
  }, {} as AsteroidTextures);
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
