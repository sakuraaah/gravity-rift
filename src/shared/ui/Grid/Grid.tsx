import { GridRoot } from './Grid.styles';
import type { GridProps } from './Grid.types';

export function Grid({
  children,
  columnRatios = [1],
  gap = 0,
  ...props
}: GridProps) {
  const ratios = columnRatios.length > 0 ? columnRatios : [1];
  const templateColumns = ratios
    .map(
      (ratio) =>
        `minmax(0, ${Number.isFinite(ratio) && ratio > 0 ? ratio : 1}fr)`
    )
    .join(' ');

  return (
    <GridRoot $gap={gap} $templateColumns={templateColumns} {...props}>
      {children}
    </GridRoot>
  );
}
