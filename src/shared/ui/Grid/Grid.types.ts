import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';

export type GridProps = PropsWithChildren<
  Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    columnRatios?: readonly number[];
    gap?: CSSProperties['gap'];
  }
>;
