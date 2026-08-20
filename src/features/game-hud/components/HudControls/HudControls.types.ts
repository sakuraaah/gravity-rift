import type {
  PlayerControl,
  PlayerMouseButton,
} from '@/game/systems/player-controls';
import type { ArrowIconDirection } from '@/shared/icons';

export type PlayerInputId = PlayerControl | PlayerMouseButton;

export type HudControlsProps = {
  pressedKeys: Readonly<Record<PlayerControl, boolean>>;
  pressedMouseButtons: Readonly<Record<PlayerMouseButton, boolean>>;
};

export type HudControlKeyConfig = {
  alternativeIds?: readonly PlayerInputId[];
  ariaLabel: string;
  content:
    | { direction: ArrowIconDirection; kind: 'arrow' }
    | { kind: 'text'; value: string };
  id: PlayerInputId;
  wide?: boolean;
};

export type HudControlHintConfig = {
  id: string;
  keys: readonly HudControlKeyConfig[];
  label: string;
};
