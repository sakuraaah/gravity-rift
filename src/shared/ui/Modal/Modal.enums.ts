export const ModalHeaderTone = {
  Critical: 'critical',
  Default: 'default',
} as const;

export type ModalHeaderTone =
  (typeof ModalHeaderTone)[keyof typeof ModalHeaderTone];
