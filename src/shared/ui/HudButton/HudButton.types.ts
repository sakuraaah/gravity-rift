import type { ReactNode } from 'react';

export type HudButtonProps = {
  'aria-label'?: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
  size?: 'default' | 'small';
  wide?: boolean;
};
