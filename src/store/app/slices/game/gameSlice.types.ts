import type { DamageResult } from '@/game/systems/combat';
import type {
  PlayerControl,
  PlayerMouseButton,
} from '@/game/systems/player-controls/playerControls.enums';

export type PressedKeys = Readonly<Record<PlayerControl, boolean>>;
export type PressedMouseButtons = Readonly<Record<PlayerMouseButton, boolean>>;

export type GameState = {
  bulletDamage: number;
  gameSpeedMultiplier: number;
  playerHp: number;
  playerInvincibleUntilGameTimeMs: number;
  pressedKeys: PressedKeys;
  pressedMouseButtons: PressedMouseButtons;
  score: number;
  wave: number;
};

export type GameSlice = GameState & {
  addScore: (points: number) => void;
  damagePlayer: (damage: number, gameTimeMs: number) => DamageResult | null;
  defeatPlayer: () => void;
  increaseWave: () => void;
  resetPressedInputs: () => void;
  setBulletDamage: (damage: number) => void;
  setGameSpeedMultiplier: (multiplier: number) => void;
  setPressedKey: (key: PlayerControl, isPressed: boolean) => void;
  setPressedMouseButton: (
    button: PlayerMouseButton,
    isPressed: boolean
  ) => void;
};
