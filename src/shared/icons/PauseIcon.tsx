import type { IconProps } from './Icon.types';

export function PauseIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      height="16"
      shapeRendering="crispEdges"
      viewBox="0 0 8 8"
      width="16"
      {...props}
    >
      <path d="M1 0h2v7H1z M5 0h2v7H5z" fill="currentColor" />
    </svg>
  );
}
