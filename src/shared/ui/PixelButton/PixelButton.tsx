import { forwardRef } from 'react';

import { ButtonRoot, IconButtonRoot } from './PixelButton.styles';
import type {
  PixelButtonProps,
  PixelIconButtonProps,
} from './PixelButton.types';

export const PixelButton = forwardRef<HTMLElement, PixelButtonProps>(
  function PixelButton(
    { fullWidth = false, type = 'button', variant = 'primary', ...props },
    ref
  ) {
    return (
      <ButtonRoot
        ref={ref}
        $fullWidth={fullWidth}
        $variant={variant}
        type={type}
        {...props}
      />
    );
  }
);

export const PixelIconButton = forwardRef<HTMLElement, PixelIconButtonProps>(
  function PixelIconButton(
    { type = 'button', variant = 'secondary', ...props },
    ref
  ) {
    return (
      <IconButtonRoot ref={ref} $variant={variant} type={type} {...props} />
    );
  }
);
