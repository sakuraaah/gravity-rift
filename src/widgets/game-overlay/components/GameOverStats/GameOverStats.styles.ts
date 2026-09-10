import styled from '@emotion/styled';

export const GameOverStatsRoot = styled.dl({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  margin: 0,
});

export const GameOverStat = styled.div(({ theme }) => ({
  '--game-over-stat-color': theme.palette.text.high,
  display: 'grid',
  minWidth: 0,
  padding: '4px 12px 6px',
  justifyItems: 'center',
  gap: '8px',
  '& + &': {
    borderLeft: `1px solid ${theme.palette.border.soft}`,
  },
  '&.game-over-stats__item--score': {
    '--game-over-stat-color': theme.palette.primary.main,
  },
  '&.game-over-stats__item--wave': {
    '--game-over-stat-color': theme.palette.secondary.main,
  },
  '& .game-over-stats__label': {
    color: theme.palette.text.dim,
    fontSize: theme.typography.fontSize.hudLabel,
    textAlign: 'center',
  },
  '& .game-over-stats__value': {
    color: 'var(--game-over-stat-color)',
    fontSize: theme.typography.fontSize.hudValue,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
}));
