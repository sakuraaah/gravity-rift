export const CollisionInteraction = {
  AsteroidAsteroid: 'asteroid-asteroid',
  BulletAsteroid: 'bullet-asteroid',
  SpaceshipAsteroid: 'spaceship-asteroid',
  SpaceshipBlackHole: 'spaceship-black-hole',
} as const;

export type CollisionInteraction =
  (typeof CollisionInteraction)[keyof typeof CollisionInteraction];
