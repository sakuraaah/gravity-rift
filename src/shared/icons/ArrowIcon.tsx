import type { IconProps } from './Icon.types';

export type ArrowIconDirection = keyof typeof ARROW_BY_DIRECTION;

export type ArrowIconProps = IconProps & {
  direction: ArrowIconDirection;
};

const ARROW_BY_DIRECTION = {
  left: {
    height: 10,
    path: 'M2 0h1v1H2z M1 1h2v1H1z M0 2h6v1H0z M1 3h2v1H1z M2 4h1v1H2z',
    viewBox: '0 0 6 5',
    width: 12,
  },
  right: {
    height: 10,
    path: 'M3 0h1v1H3z M3 1h2v1H3z M0 2h6v1H0z M3 3h2v1H3z M3 4h1v1H3z',
    viewBox: '0 0 6 5',
    width: 12,
  },
  up: {
    height: 12,
    path: 'M2 0h1v1H2z M1 1h3v1H1z M0 2h5v1H0z M2 3h1v3H2z',
    viewBox: '0 0 5 6',
    width: 10,
  },
} as const;

export function ArrowIcon({ direction, ...props }: ArrowIconProps) {
  const arrow = ARROW_BY_DIRECTION[direction];

  return (
    <svg
      aria-hidden="true"
      height={arrow.height}
      shapeRendering="crispEdges"
      viewBox={arrow.viewBox}
      width={arrow.width}
      {...props}
    >
      <path d={arrow.path} fill="currentColor" />
    </svg>
  );
}
