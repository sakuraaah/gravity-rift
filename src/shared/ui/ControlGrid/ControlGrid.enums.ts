export const ControlFieldType = {
  Button: 'button',
} as const;

export type ControlFieldType =
  (typeof ControlFieldType)[keyof typeof ControlFieldType];
