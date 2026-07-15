export const CollisionKind = {
  Asteroid: 'asteroid',
  Bullet: 'bullet',
  Spaceship: 'spaceship',
} as const;

export type CollisionKind = (typeof CollisionKind)[keyof typeof CollisionKind];
