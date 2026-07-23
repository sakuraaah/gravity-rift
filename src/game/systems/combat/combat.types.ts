import type { Vector2 } from '@/game/utils';

export type DamageResult = {
  appliedDamage: number;
  destroyed: boolean;
  previousHp: number;
  remainingHp: number;
};

export type ActiveEntity = {
  readonly isActive: boolean;
};

export type PositionedEntity = {
  readonly position: Readonly<Vector2>;
};

export type SizedEntity<TSize> = {
  readonly size: TSize;
};

export type Damageable = ActiveEntity & {
  takeDamage: (damage: number) => DamageResult | null;
};

export type Consumable = ActiveEntity & {
  consume: () => boolean;
};

export type ProjectileDamageSource = ActiveEntity & {
  readonly damage: number;
};

export type ContactDamageSource = ActiveEntity & {
  readonly contactDamage: number;
};
