import { Typography, TypographyVariant } from '@/shared/ui/Typography';

import { GameOverStat, GameOverStatsRoot } from './GameOverStats.styles';
import type { GameOverStatsProps } from './GameOverStats.types';

function formatStatValue(value: number, minimumLength: number) {
  const normalizedValue = Number.isFinite(value)
    ? Math.max(0, Math.floor(value))
    : 0;

  return String(normalizedValue).padStart(minimumLength, '0');
}

export function GameOverStats({ score, wave }: GameOverStatsProps) {
  return (
    <GameOverStatsRoot>
      <GameOverStat className="game-over-stats__item--score">
        <Typography
          className="game-over-stats__label"
          component="dt"
          variant={TypographyVariant.HudLabel}
        >
          Final Score
        </Typography>
        <Typography
          className="game-over-stats__value"
          component="dd"
          variant={TypographyVariant.HudValue}
        >
          {formatStatValue(score, 6)}
        </Typography>
      </GameOverStat>

      <GameOverStat className="game-over-stats__item--wave">
        <Typography
          className="game-over-stats__label"
          component="dt"
          variant={TypographyVariant.HudLabel}
        >
          Waves
        </Typography>
        <Typography
          className="game-over-stats__value"
          component="dd"
          variant={TypographyVariant.HudValue}
        >
          {formatStatValue(wave, 2)}
        </Typography>
      </GameOverStat>
    </GameOverStatsRoot>
  );
}
