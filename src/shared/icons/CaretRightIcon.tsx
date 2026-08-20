import type { IconProps } from './Icon.types';

export function CaretRightIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      height="1em"
      shapeRendering="crispEdges"
      viewBox="0 0 11 10"
      width="1.1em"
      {...props}
    >
      <path d="M1 0 11 5 1 10Z" fill="currentColor" />
    </svg>
  );
}
