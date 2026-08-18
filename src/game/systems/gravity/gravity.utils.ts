import type { BlackHolePhase } from '@/game/entities/black-hole/blackHole.enums';
import type { PhasedEntity, PositionedEntity } from '@/game/systems/combat';
import type { Vector2 } from '@/game/utils';

import {
  BLACK_HOLE_GRAVITY_PROFILE_BY_PHASE,
  MIN_GRAVITY_DISTANCE_SQUARED,
  ZERO_GRAVITY_ACCELERATION,
} from './gravity.constants';
import type { BlackHoleGravityAccelerationResult } from './gravity.types';

function calculateGravityAccelerationFromSource(
  targetPosition: Readonly<Vector2>,
  source: PositionedEntity & PhasedEntity<BlackHolePhase>
): Readonly<Vector2> | null {
  const profile = BLACK_HOLE_GRAVITY_PROFILE_BY_PHASE[source.phase];

  if (!profile) {
    return null;
  }

  const dx = source.position.x - targetPosition.x;
  const dy = source.position.y - targetPosition.y;
  const distanceSquared = dx * dx + dy * dy;
  const influenceRadiusSquared =
    profile.influenceRadius * profile.influenceRadius;

  if (distanceSquared >= influenceRadiusSquared) {
    return null;
  }

  if (distanceSquared === 0) {
    return ZERO_GRAVITY_ACCELERATION;
  }

  const distance = Math.sqrt(distanceSquared);
  const effectiveDistanceSquared = Math.max(
    distanceSquared,
    MIN_GRAVITY_DISTANCE_SQUARED
  );
  const accelerationMagnitude = profile.strength / effectiveDistanceSquared;

  return {
    x: (dx / distance) * accelerationMagnitude,
    y: (dy / distance) * accelerationMagnitude,
  };
}

export function calculateBlackHoleGravityAcceleration(
  targetPosition: Readonly<Vector2>,
  sources: readonly (PositionedEntity & PhasedEntity<BlackHolePhase>)[]
): BlackHoleGravityAccelerationResult {
  let accelerationX = 0;
  let accelerationY = 0;
  let isInfluenced = false;

  for (const source of sources) {
    const sourceAcceleration = calculateGravityAccelerationFromSource(
      targetPosition,
      source
    );

    if (!sourceAcceleration) {
      continue;
    }

    accelerationX += sourceAcceleration.x;
    accelerationY += sourceAcceleration.y;
    isInfluenced = true;
  }

  return {
    acceleration: {
      x: accelerationX,
      y: accelerationY,
    },
    isInfluenced,
  };
}
