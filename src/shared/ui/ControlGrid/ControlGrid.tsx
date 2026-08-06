import { Grid } from '@/shared/ui/Grid';
import { PixelButton } from '@/shared/ui/PixelButton';

import type { ControlGridProps } from './ControlGrid.types';

export function ControlGrid({
  fields,
  gap = '12px',
  ...props
}: ControlGridProps) {
  return (
    <Grid gap={gap} {...props}>
      {fields.map((field) => (
        <PixelButton key={field.id} {...field.buttonProps} />
      ))}
    </Grid>
  );
}
