import type { Vector2 } from './vector.types';

export function normalizeVector(vector: Vector2): Vector2 {
  const length = Math.hypot(vector.x, vector.y);

  if (length === 0) {
    return { x: 0, y: 1 };
  }

  return {
    x: vector.x / length,
    y: vector.y / length,
  };
}

export function rotateVector(vector: Vector2, radians: number): Vector2 {
  const sin = Math.sin(radians);
  const cos = Math.cos(radians);

  return {
    x: vector.x * cos - vector.y * sin,
    y: vector.x * sin + vector.y * cos,
  };
}

export function getVectorDistanceSquared(a: Vector2, b: Vector2) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return dx * dx + dy * dy;
}

export function getNearestVectorDistanceSquared(
  location: Vector2,
  candidates: Vector2[]
) {
  if (candidates.length === 0) {
    return Number.POSITIVE_INFINITY;
  }

  return candidates.reduce((nearestDistance, candidate) => {
    return Math.min(
      nearestDistance,
      getVectorDistanceSquared(location, candidate)
    );
  }, Number.POSITIVE_INFINITY);
}
