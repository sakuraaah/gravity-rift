export const CollisionInteraction = {
  AsteroidAsteroid: 'asteroid-asteroid',
  BulletAsteroid: 'bullet-asteroid',
  SpaceshipAsteroid: 'spaceship-asteroid',
} as const;

export type CollisionInteraction =
  (typeof CollisionInteraction)[keyof typeof CollisionInteraction];
