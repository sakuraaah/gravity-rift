import {
  type AnimationFrames,
  getLoadedOneShotEffectTextures,
} from '@/game/assets';

import { OneShotEffectKind } from './oneShotEffect.enums';
import type { OneShotEffectRequest } from './oneShotEffect.types';

export function getAnimationFramesForRequest(
  request: OneShotEffectRequest
): AnimationFrames {
  const textures = getLoadedOneShotEffectTextures();

  switch (request.kind) {
    case OneShotEffectKind.AsteroidExplosion:
      return textures.asteroidExplosion[request.size];
    case OneShotEffectKind.BulletSpark:
      return textures.bulletSpark;
    case OneShotEffectKind.DebrisBurst:
      return textures.debrisBurst;
    case OneShotEffectKind.ShipExplosion:
      return textures.shipExplosion;
  }
}
