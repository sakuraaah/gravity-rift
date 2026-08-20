import { forwardRef } from 'react';

import { CaretRightIcon } from '@/shared/icons';

import { ButtonRoot, IconButtonRoot } from './PixelButton.styles';
import type {
  PixelButtonProps,
  PixelIconButtonProps,
} from './PixelButton.types';

export const PixelButton = forwardRef<HTMLElement, PixelButtonProps>(
  function PixelButton(
    {
      children,
      fullWidth = false,
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref
  ) {
    return (
      <ButtonRoot
        ref={ref}
        $fullWidth={fullWidth}
        $variant={variant}
        type={type}
        {...props}
      >
        {variant === 'primary' ? (
          <CaretRightIcon className="pixel-button__caret" />
        ) : null}
        {children}
      </ButtonRoot>
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
