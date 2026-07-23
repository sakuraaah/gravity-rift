import type { AnimationFrames } from '@/game/assets/types';
import { getSpritesheetAnimation, loadSpritesheet } from '@/game/assets/utils';
import { AsteroidSize } from '@/game/entities/asteroid/asteroid.enums';

const HIT_ATLAS_URL = '/assets/sprites/hit.atlas.json';
const EXPLOSION_ATLAS_URL = '/assets/sprites/explosion.atlas.json';

export type OneShotEffectTextures = {
  asteroidExplosion: Record<AsteroidSize, AnimationFrames>;
  bulletSpark: AnimationFrames;
  debrisBurst: AnimationFrames;
  shipExplosion: AnimationFrames;
};

let oneShotEffectTextures: OneShotEffectTextures | null = null;
let oneShotEffectTexturesLoadPromise: Promise<OneShotEffectTextures> | null =
  null;

async function loadTextures(): Promise<OneShotEffectTextures> {
  const [hitSpritesheet, explosionSpritesheet] = await Promise.all([
    loadSpritesheet(HIT_ATLAS_URL),
    loadSpritesheet(EXPLOSION_ATLAS_URL),
  ]);

  return {
    asteroidExplosion: {
      [AsteroidSize.Large]: getSpritesheetAnimation(
        explosionSpritesheet,
        'asteroid_lg'
      ),
      [AsteroidSize.Medium]: getSpritesheetAnimation(
        explosionSpritesheet,
        'asteroid_md'
      ),
      [AsteroidSize.Small]: getSpritesheetAnimation(
        explosionSpritesheet,
        'asteroid_sm'
      ),
    },
    bulletSpark: getSpritesheetAnimation(hitSpritesheet, 'bullet_spark'),
    debrisBurst: getSpritesheetAnimation(hitSpritesheet, 'debris_burst'),
    shipExplosion: getSpritesheetAnimation(explosionSpritesheet, 'ship'),
  };
}

export function loadOneShotEffectAssets() {
  if (oneShotEffectTextures) {
    return Promise.resolve(oneShotEffectTextures);
  }

  if (!oneShotEffectTexturesLoadPromise) {
    oneShotEffectTexturesLoadPromise = loadTextures()
      .then((textures) => {
        oneShotEffectTextures = textures;
        return textures;
      })
      .catch((error: unknown) => {
        oneShotEffectTexturesLoadPromise = null;
        throw error;
      });
  }

  return oneShotEffectTexturesLoadPromise;
}

export function getLoadedOneShotEffectTextures() {
  if (!oneShotEffectTextures) {
    throw new Error(
      'One-shot effect assets must be loaded before rendering the game.'
    );
  }

  return oneShotEffectTextures;
}
