import { TypographyVariant } from '@/shared/ui/Typography';

import {
  HudMetricLabel,
  HudMetricRoot,
  HudMetricValue,
} from './HudMetric.styles';
import type { HudMetricProps } from './HudMetric.types';

export function HudMetric({ label, value }: HudMetricProps) {
  return (
    <HudMetricRoot>
      <HudMetricLabel
        className="hud-metric__label"
        component="dt"
        variant={TypographyVariant.HudLabel}
      >
        {label}
      </HudMetricLabel>
      <HudMetricValue
        className="hud-metric__value"
        component="dd"
        variant={TypographyVariant.HudValue}
      >
        {value}
      </HudMetricValue>
    </HudMetricRoot>
  );
}
