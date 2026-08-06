import type { GridProps } from '@/shared/ui/Grid';
import type { PixelButtonProps } from '@/shared/ui/PixelButton';

import type { ControlFieldType } from './ControlGrid.enums';

export type ControlGridButtonField = {
  buttonProps: PixelButtonProps;
  id: string;
  type: typeof ControlFieldType.Button;
};

export type ControlGridField = ControlGridButtonField;

export type ControlGridProps = Omit<GridProps, 'children'> & {
  fields: readonly ControlGridField[];
};
