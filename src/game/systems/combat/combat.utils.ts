import type { DamageResult } from './combat.types';

export function applyDamage(currentHp: number, damage: number): DamageResult {
  const previousHp = Math.max(0, currentHp);
  const normalizedDamage = Math.max(0, damage);
  const remainingHp = Math.max(0, previousHp - normalizedDamage);

  return {
    appliedDamage: previousHp - remainingHp,
    destroyed: previousHp > 0 && remainingHp === 0,
    previousHp,
    remainingHp,
  };
}
