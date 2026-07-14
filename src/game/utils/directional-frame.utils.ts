import {
  DIRECTIONAL_FACING_ANGLE,
  DIRECTIONAL_FACING_COUNT,
  DIRECTIONAL_FULL_ROTATION,
} from './directional-frame.constants';

export function normalizeRotation(rotation: number) {
  return (
    ((rotation % DIRECTIONAL_FULL_ROTATION) + DIRECTIONAL_FULL_ROTATION) %
    DIRECTIONAL_FULL_ROTATION
  );
}

export function getFacingIndex(rotation: number) {
  return (
    Math.round(normalizeRotation(rotation) / DIRECTIONAL_FACING_ANGLE) %
    DIRECTIONAL_FACING_COUNT
  );
}
