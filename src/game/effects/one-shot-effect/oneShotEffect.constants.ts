import { OneShotEffectKind } from './oneShotEffect.enums';

export const ONE_SHOT_EFFECT_FPS_BY_KIND: Record<OneShotEffectKind, number> = {
  [OneShotEffectKind.AsteroidExplosion]: 12,
  [OneShotEffectKind.BulletSpark]: 14,
  [OneShotEffectKind.ShipExplosion]: 12,
};
