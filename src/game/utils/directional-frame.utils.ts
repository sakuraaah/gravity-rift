import { DIRECTIONAL_FACING_ANGLE } from './directional-frame.constants';

export function getRotationByFacingIndex(facingIndex: number) {
  return facingIndex * DIRECTIONAL_FACING_ANGLE;
}
