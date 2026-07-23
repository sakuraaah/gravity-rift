export const OneShotEffectKind = {
  AsteroidExplosion: 'asteroid-explosion',
  BulletSpark: 'bullet-spark',
  ShipExplosion: 'ship-explosion',
} as const;

export type OneShotEffectKind =
  (typeof OneShotEffectKind)[keyof typeof OneShotEffectKind];
