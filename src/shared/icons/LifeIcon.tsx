import type { IconProps } from './Icon.types';

export function LifeIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      height="7"
      shapeRendering="crispEdges"
      viewBox="0 0 8 7"
      width="8"
      {...props}
    >
      <path
        d="M0 0h1v7H0z M1 1h2v5H1z M3 2h2v3H3z M5 3h2v1H5z"
        fill="currentColor"
      />
    </svg>
  );
}
