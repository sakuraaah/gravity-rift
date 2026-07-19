export type GameStore = {
  bulletDamage: number;
  gameSpeedMultiplier: number;
  setBulletDamage: (damage: number) => void;
  setGameSpeedMultiplier: (multiplier: number) => void;
};
