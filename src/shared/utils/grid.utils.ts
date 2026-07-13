/**
 * Returns the nearest coordinate on a grid. A step of 2 produces only
 * coordinates such as -2, 0, 2, 4, so scaled pixels stay whole.
 */
export function snapToGrid(value: number, gridStep: number) {
  if (!Number.isFinite(gridStep) || gridStep <= 0) {
    throw new RangeError('Grid step must be a positive finite number.');
  }

  const gridUnits = value / gridStep;

  // Math.round() resolves negative half-steps towards zero. Mirroring the
  // positive calculation keeps snapping symmetrical on both sides of zero.
  const nearestGridUnit =
    gridUnits < 0 ? -Math.round(Math.abs(gridUnits)) : Math.round(gridUnits);

  return nearestGridUnit * gridStep;
}
