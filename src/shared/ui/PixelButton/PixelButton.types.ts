import type { ReactNode } from 'react';

import type { Button } from '@base-ui/react/button';

export type PixelButtonVariant = 'danger' | 'primary' | 'secondary';

export type PixelButtonProps = Button.Props & {
  fullWidth?: boolean;
  variant?: PixelButtonVariant;
};

export type PixelIconButtonProps = Omit<Button.Props, 'children'> & {
  'aria-label': string;
  children: ReactNode;
  variant?: PixelButtonVariant;
};
