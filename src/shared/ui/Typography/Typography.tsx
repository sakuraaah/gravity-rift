import { TypographyRoot } from './Typography.styles';
import type { TypographyProps } from './Typography.types';

export function Typography({
  align,
  color,
  component = 'span',
  fontSize,
  variant,
  ...props
}: TypographyProps) {
  return (
    <TypographyRoot
      as={component}
      $align={align}
      $color={color}
      $fontSize={fontSize}
      $variant={variant}
      {...props}
    />
  );
}
