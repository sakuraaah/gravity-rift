import type { IconProps } from './Icon.types';

export function HelpIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      height="16"
      width="16"
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      {...props}
    >
      <path
        d="M2 0h4v1H2z M1 1h2v2H1z M5 1h2v3H5z M3 4h3v1H3z M3 5h2v1H3z M3 7h2v1H3z"
        fill="currentColor"
      />
    </svg>
  );
}
