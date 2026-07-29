import { OneShotEffectKind } from './oneShotEffect.enums';

export const ONE_SHOT_EFFECT_FPS_BY_KIND = {
  [OneShotEffectKind.AsteroidExplosion]: 12,
  [OneShotEffectKind.BulletSpark]: 14,
  [OneShotEffectKind.DebrisBurst]: 14,
  [OneShotEffectKind.ShipExplosion]: 12,
} as const satisfies Record<OneShotEffectKind, number>;
