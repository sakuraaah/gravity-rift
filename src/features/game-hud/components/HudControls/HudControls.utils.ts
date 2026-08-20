import type {
  HudControlKeyConfig,
  HudControlsProps,
  PlayerInputId,
} from './HudControls.types';

function isInputPressed(
  id: PlayerInputId,
  pressedKeys: HudControlsProps['pressedKeys'],
  pressedMouseButtons: HudControlsProps['pressedMouseButtons']
) {
  return typeof id === 'number' ? pressedMouseButtons[id] : pressedKeys[id];
}

export function isHudControlActive(
  key: HudControlKeyConfig,
  pressedKeys: HudControlsProps['pressedKeys'],
  pressedMouseButtons: HudControlsProps['pressedMouseButtons']
) {
  return (
    isInputPressed(key.id, pressedKeys, pressedMouseButtons) ||
    key.alternativeIds?.some((id) =>
      isInputPressed(id, pressedKeys, pressedMouseButtons)
    ) ||
    false
  );
}
