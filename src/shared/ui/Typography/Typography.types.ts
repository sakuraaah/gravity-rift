import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementType,
} from 'react';

import type { TypographyVariant } from './Typography.enums';

export type TypographyProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'color'
> & {
  align?: CSSProperties['textAlign'];
  color?: CSSProperties['color'];
  component?: ElementType;
  fontSize?: CSSProperties['fontSize'];
  variant: TypographyVariant;
};
