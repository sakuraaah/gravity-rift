import { BLACK_HOLE_FRAME_RADIUS } from '@/game/entities/black-hole/blackHole.constants';
import { SPACESHIP_BOUNDARY_RADIUS } from '@/game/entities/spaceship/constants';
import {
  getNearestVectorDistanceSquared,
  randomCenteredBias,
  randomInteger,
} from '@/game/utils';
import type { Vector2 } from '@/game/utils';

import { BLACK_HOLE_SPAWN_CONFIG } from './blackHoleSpawn.constants';
import type {
  BlackHoleSpawnBounds,
  BlackHoleSpawnOptions,
  BlackHoleSpawnResult,
} from './blackHoleSpawn.types';

type ReachableSpawnBounds = {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
};

function getReachableSpawnBounds({
  height,
  width,
}: BlackHoleSpawnBounds): ReachableSpawnBounds | null {
  const boundaryInset = Math.max(
    BLACK_HOLE_FRAME_RADIUS,
    SPACESHIP_BOUNDARY_RADIUS
  );
  const maxX = Math.floor(width - boundaryInset);
  const maxY = Math.floor(height - boundaryInset);
  const minX = Math.ceil(boundaryInset);
  const minY = Math.ceil(boundaryInset);

  if (minX > maxX || minY > maxY) {
    return null;
  }

  return {
    maxX,
    maxY,
    minX,
    minY,
  };
}

function isLocationAvailable(location: Vector2, occupiedLocations: Vector2[]) {
  const minDistance = BLACK_HOLE_SPAWN_CONFIG.minCenterDistance;

  return (
    getNearestVectorDistanceSquared(location, occupiedLocations) >=
    minDistance * minDistance
  );
}

function createRandomLocation({
  maxX,
  maxY,
  minX,
  minY,
}: ReachableSpawnBounds): Vector2 {
  return {
    x: minX + randomInteger(maxX - minX + 1),
    y: minY + randomInteger(maxY - minY + 1),
  };
}

function findAvailableLocation(
  bounds: ReachableSpawnBounds,
  occupiedLocations: Vector2[]
): Vector2 | null {
  for (
    let attempt = 0;
    attempt < BLACK_HOLE_SPAWN_CONFIG.maxSpawnAttempts;
    attempt += 1
  ) {
    const location = createRandomLocation(bounds);

    if (isLocationAvailable(location, occupiedLocations)) {
      return location;
    }
  }

  return null;
}

export function sampleNextBlackHoleSpawnDelayMs() {
  const jitterMs =
    BLACK_HOLE_SPAWN_CONFIG.meanIntervalMs *
    BLACK_HOLE_SPAWN_CONFIG.intervalJitterRatio *
    randomCenteredBias();

  return BLACK_HOLE_SPAWN_CONFIG.meanIntervalMs + jitterMs;
}

export function createBlackHoleSpawnData({
  bounds,
  occupiedLocations,
}: BlackHoleSpawnOptions): BlackHoleSpawnResult {
  const reachableBounds = getReachableSpawnBounds(bounds);

  if (!reachableBounds) {
    return null;
  }

  const location = findAvailableLocation(reachableBounds, occupiedLocations);

  return location ? { location } : null;
}
