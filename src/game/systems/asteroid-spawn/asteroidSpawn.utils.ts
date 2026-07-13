import { ASTEROID_BASE_MOVEMENT_SPEED_BY_SIZE } from '@/game/entities/asteroid/asteroid.constants';
import type { AsteroidSize } from '@/game/entities/asteroid/asteroid.enums';
import type { AsteroidSpawnData } from '@/game/entities/asteroid/asteroid.types';
import {
  clamp,
  degreesToRadians,
  getNearestVectorDistanceSquared,
  normalizeVector,
  randomBetween,
  randomCenteredBias,
  rotateVector,
} from '@/game/utils';
import type { Vector2 } from '@/game/utils';

import {
  ASTEROID_SPAWN_CONFIG_BY_SIZE,
  ASTEROID_SPAWN_SIDE_WEIGHTS,
} from './asteroidSpawn.constants';
import type { AsteroidSpawnOptions } from './asteroidSpawn.types';

function createBorderSpawnLocation({
  bounds,
  margin,
}: Pick<AsteroidSpawnOptions, 'bounds' | 'margin'>): Vector2 {
  const side = selectSpawnSide();

  if (side === 'top') {
    return {
      x: randomBetween(0, bounds.width),
      y: -margin,
    };
  }

  if (side === 'right') {
    return {
      x: bounds.width + margin,
      y: randomBetween(0, bounds.height),
    };
  }

  if (side === 'bottom') {
    return {
      x: randomBetween(0, bounds.width),
      y: bounds.height + margin,
    };
  }

  return {
    x: -margin,
    y: randomBetween(0, bounds.height),
  };
}

function selectSpawnSide() {
  const sideWeights = ASTEROID_SPAWN_SIDE_WEIGHTS;
  const totalWeight = Object.values(sideWeights).reduce(
    (sum, weight) => sum + weight,
    0
  );
  let roll = randomBetween(0, totalWeight);

  for (const [side, weight] of Object.entries(sideWeights)) {
    roll -= weight;

    if (roll <= 0) {
      return side as keyof typeof sideWeights;
    }
  }

  return 'left' as keyof typeof sideWeights;
}

function createSpacedBorderSpawnLocation({
  bounds,
  margin,
  occupiedLocations,
  size,
}: Pick<
  AsteroidSpawnOptions,
  'bounds' | 'margin' | 'occupiedLocations' | 'size'
>): Vector2 {
  const config = ASTEROID_SPAWN_CONFIG_BY_SIZE[size];
  const minDistanceSquared = config.minSpawnDistance * config.minSpawnDistance;
  let bestLocation = createBorderSpawnLocation({ bounds, margin });
  let bestDistanceSquared = getNearestVectorDistanceSquared(
    bestLocation,
    occupiedLocations
  );

  // Lightweight blue-noise guard: try a few border points and keep one that
  // is not visually clumped with active asteroids near the spawn edge.
  for (let attempt = 1; attempt < config.maxSpawnAttempts; attempt += 1) {
    if (bestDistanceSquared >= minDistanceSquared) {
      return bestLocation;
    }

    const candidateLocation = createBorderSpawnLocation({ bounds, margin });
    const candidateDistanceSquared = getNearestVectorDistanceSquared(
      candidateLocation,
      occupiedLocations
    );

    if (candidateDistanceSquared > bestDistanceSquared) {
      bestLocation = candidateLocation;
      bestDistanceSquared = candidateDistanceSquared;
    }
  }

  return bestLocation;
}

export function sampleNextAsteroidSpawnDelayMs(size: AsteroidSize) {
  const config = ASTEROID_SPAWN_CONFIG_BY_SIZE[size];
  const jitterMs =
    config.meanIntervalMs * config.intervalJitterRatio * randomCenteredBias();

  return clamp(
    config.meanIntervalMs + jitterMs,
    config.minIntervalMs,
    config.maxIntervalMs
  );
}

export function createAsteroidSpawnData({
  bounds,
  margin,
  occupiedLocations,
  size,
  target,
}: AsteroidSpawnOptions): AsteroidSpawnData {
  const location = createSpacedBorderSpawnLocation({
    bounds,
    margin,
    occupiedLocations,
    size,
  });
  const directionToTarget = normalizeVector({
    x: target.x - location.x,
    y: target.y - location.y,
  });
  const config = ASTEROID_SPAWN_CONFIG_BY_SIZE[size];
  const deviationDegrees = randomCenteredBias() * config.maxDeviationDegrees;
  const deviationRadians = degreesToRadians(deviationDegrees);
  const direction = rotateVector(directionToTarget, deviationRadians);
  const speed = ASTEROID_BASE_MOVEMENT_SPEED_BY_SIZE[size];

  return {
    location,
    size,
    velocity: {
      x: direction.x * speed,
      y: direction.y * speed,
    },
  };
}
