import { HudMetric } from '@/features/game-hud/components/HudMetric';
import type { HudMetricProps } from '@/features/game-hud/components/HudMetric';

import { ScoreRoot } from './Score.styles';

type ScoreProps = Pick<HudMetricProps, 'value'>;

export function Score({ value }: ScoreProps) {
  return (
    <ScoreRoot>
      <HudMetric label="Score" value={value} />
    </ScoreRoot>
  );
}
