import type { ComponentProps, ReactNode } from 'react';

import { Switch } from '@base-ui/react/switch';

import { TypographyVariant } from '@/shared/ui/Typography';

import { SwitchLabel, SwitchRoot, SwitchThumb } from './PixelSwitch.styles';

export type PixelSwitchProps = Omit<
  ComponentProps<typeof Switch.Root>,
  'children' | 'className'
> & {
  className?: string;
  label: ReactNode;
};

export function PixelSwitch({
  className,
  label,
  ...switchProps
}: PixelSwitchProps) {
  return (
    <SwitchLabel
      className={className}
      component="label"
      variant={TypographyVariant.ControlLabel}
    >
      <SwitchRoot {...switchProps}>
        <SwitchThumb />
      </SwitchRoot>
      <span>{label}</span>
    </SwitchLabel>
  );
}
