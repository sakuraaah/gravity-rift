import { HudMetric } from '@/features/game-hud/components/HudMetric';
import type { HudMetricProps } from '@/features/game-hud/components/HudMetric';

import { WaveRoot } from './Wave.styles';

type WaveProps = Pick<HudMetricProps, 'value'>;

export function Wave({ value }: WaveProps) {
  return (
    <WaveRoot>
      <HudMetric label="Wave" value={value} />
    </WaveRoot>
  );
}
