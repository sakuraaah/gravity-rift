export const CollisionKind = {
  Asteroid: 'asteroid',
  BlackHole: 'black-hole',
  Bullet: 'bullet',
  Spaceship: 'spaceship',
} as const;

export type CollisionKind = (typeof CollisionKind)[keyof typeof CollisionKind];

export const CollisionPhase = {
  Enter: 'enter',
  Exit: 'exit',
  Stay: 'stay',
} as const;

export type CollisionPhase =
  (typeof CollisionPhase)[keyof typeof CollisionPhase];
