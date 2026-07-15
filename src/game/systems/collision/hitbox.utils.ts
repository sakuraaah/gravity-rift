import type { HitboxPoint } from './hitbox.types';

export function scaleHitboxPoints(
  points: readonly HitboxPoint[],
  scale: number
): HitboxPoint[] {
  return points.map(({ x, y }) => ({
    x: x * scale,
    y: y * scale,
  }));
}
