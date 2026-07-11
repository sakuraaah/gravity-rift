import { Assets, Spritesheet } from 'pixi.js';
import type { Texture } from 'pixi.js';

import type { TextureFrames } from '@/game/assets/types';

export async function loadSpritesheet(assetUrl: string) {
  const spritesheet = await Assets.load<Spritesheet>(assetUrl);

  spritesheet.textureSource.scaleMode = 'nearest';

  return spritesheet;
}

export function getSpritesheetTexture(
  spritesheet: Spritesheet,
  textureName: string
): Texture {
  const texture = spritesheet.textures[textureName];

  if (!texture) {
    throw new Error(`Missing spritesheet texture: ${textureName}`);
  }

  return texture;
}

export function getSpritesheetAnimation(
  spritesheet: Spritesheet,
  animationName: string
): TextureFrames {
  const animation = spritesheet.animations[animationName];

  if (!animation) {
    throw new Error(`Missing spritesheet animation: ${animationName}`);
  }

  return animation;
}
