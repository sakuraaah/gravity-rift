import { Assets, Spritesheet } from 'pixi.js';
import type { Texture } from 'pixi.js';

import type { AnimationFrames } from '@/game/assets/types';

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

export function getSpritesheetTextures(spritesheet: Spritesheet): Texture[] {
  const textures = Object.values(spritesheet.textures);

  if (textures.length === 0) {
    throw new Error('Spritesheet must contain at least one texture.');
  }

  return textures;
}

export function getSpritesheetAnimation(
  spritesheet: Spritesheet,
  animationName: string
): AnimationFrames {
  const animation = spritesheet.animations[animationName];

  if (!animation) {
    throw new Error(`Missing spritesheet animation: ${animationName}`);
  }

  return animation;
}

export function getSpritesheetAnimations(
  spritesheet: Spritesheet
): AnimationFrames[] {
  const animations = Object.values(spritesheet.animations);

  if (animations.length === 0) {
    throw new Error('Spritesheet must contain at least one animation.');
  }

  return animations;
}
