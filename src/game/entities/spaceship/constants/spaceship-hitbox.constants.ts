import type { HitboxPoint } from '@/game/systems';

export const SPACESHIP_HITBOX_LOCAL_POINTS = [
  { x: 0, y: -4 },
  { x: 3.5, y: 3.5 },
  { x: -3.5, y: 3.5 },
] as const satisfies ReadonlyArray<HitboxPoint>;
