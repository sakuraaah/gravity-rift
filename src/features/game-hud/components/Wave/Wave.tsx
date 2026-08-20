import { HudMetric } from '@/features/game-hud/components/HudMetric';
import type { HudMetricProps } from '@/features/game-hud/components/HudMetric';
import { INITIAL_WAVE } from '@/game/systems/scoring/scoring.constants';

import { WaveRoot } from './Wave.styles';

type WaveProps = Pick<HudMetricProps, 'value'>;

export function Wave({ value }: WaveProps) {
  return (
    <WaveRoot key={value} $animate={value > INITIAL_WAVE}>
      <HudMetric label="Wave" value={value} />
    </WaveRoot>
  );
}
