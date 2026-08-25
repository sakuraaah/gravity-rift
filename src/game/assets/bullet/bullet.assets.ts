import { Assets } from 'pixi.js';
import type { Texture } from 'pixi.js';

const BULLET_ASSET_URLS = {
  bullet: '/assets/sprites/bullet-1x.png',
  trail: '/assets/sprites/bullet-trail.svg',
} as const;

export type BulletTextures = Record<keyof typeof BULLET_ASSET_URLS, Texture>;

let bulletTextures: BulletTextures | null = null;
let bulletTexturesLoadPromise: Promise<BulletTextures> | null = null;

async function loadTextures(): Promise<BulletTextures> {
  const [bullet, trail] = await Promise.all([
    Assets.load<Texture>(BULLET_ASSET_URLS.bullet),
    Assets.load<Texture>(BULLET_ASSET_URLS.trail),
  ]);

  const textures = { bullet, trail };

  Object.values(textures).forEach((texture) => {
    texture.source.scaleMode = 'nearest';
  });

  return textures;
}

export function loadBulletAssets() {
  if (bulletTextures) {
    return Promise.resolve(bulletTextures);
  }

  if (!bulletTexturesLoadPromise) {
    bulletTexturesLoadPromise = loadTextures()
      .then((textures) => {
        bulletTextures = textures;
        return textures;
      })
      .catch((error: unknown) => {
        bulletTexturesLoadPromise = null;
        throw error;
      });
  }

  return bulletTexturesLoadPromise;
}

export function getLoadedBulletTextures() {
  if (!bulletTextures) {
    throw new Error('Bullet assets must be loaded before rendering the game.');
  }

  return bulletTextures;
}
