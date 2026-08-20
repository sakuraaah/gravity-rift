import { TypographyVariant } from '@/shared/ui/Typography';

import { HudButtonRoot } from './HudButton.styles';
import type { HudButtonProps } from './HudButton.types';

export function HudButton({
  active = false,
  children,
  size = 'default',
  wide = false,
  ...props
}: HudButtonProps) {
  return (
    <HudButtonRoot
      $active={active}
      $size={size}
      $wide={wide}
      aria-disabled="true"
      variant={TypographyVariant.HudLabel}
      {...props}
    >
      {children}
    </HudButtonRoot>
  );
}
