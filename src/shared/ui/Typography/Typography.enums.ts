export const TypographyVariant = {
  ControlLabel: 'control-label',
  HudLabel: 'hud-label',
  HudValue: 'hud-value',
  MainMenuSubtitle: 'main-menu-subtitle',
  MainMenuTitle: 'main-menu-title',
  ModalSubtitle: 'modal-subtitle',
  ModalTitle: 'modal-title',
} as const;

export type TypographyVariant =
  (typeof TypographyVariant)[keyof typeof TypographyVariant];
