import { Assets } from 'pixi.js';
import type { Texture } from 'pixi.js';

const BULLET_TRAIL_TEXTURE_URL = '/assets/sprites/bullet-trail.svg';

let bulletTrailTexture: Texture | null = null;
let bulletTrailTextureLoadPromise: Promise<Texture> | null = null;

export function loadBulletAssets() {
  if (bulletTrailTexture) {
    return Promise.resolve(bulletTrailTexture);
  }

  if (!bulletTrailTextureLoadPromise) {
    bulletTrailTextureLoadPromise = Assets.load<Texture>(
      BULLET_TRAIL_TEXTURE_URL
    )
      .then((texture) => {
        texture.source.scaleMode = 'nearest';
        bulletTrailTexture = texture;
        return texture;
      })
      .catch((error: unknown) => {
        bulletTrailTextureLoadPromise = null;
        throw error;
      });
  }

  return bulletTrailTextureLoadPromise;
}

export function getLoadedBulletTrailTexture() {
  if (!bulletTrailTexture) {
    throw new Error('Bullet assets must be loaded before rendering the game.');
  }

  return bulletTrailTexture;
}
