export const CollisionInteraction = {
  AsteroidBlackHole: 'asteroid-black-hole',
  AsteroidAsteroid: 'asteroid-asteroid',
  BulletAsteroid: 'bullet-asteroid',
  BulletBlackHole: 'bullet-black-hole',
  SpaceshipAsteroid: 'spaceship-asteroid',
  SpaceshipBlackHole: 'spaceship-black-hole',
} as const;

export type CollisionInteraction =
  (typeof CollisionInteraction)[keyof typeof CollisionInteraction];
