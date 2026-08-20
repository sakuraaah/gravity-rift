import styled from '@emotion/styled';

export const ScoreRoot = styled.div(({ theme }) => ({
  textAlign: 'left',
  '& .hud-metric__label': {
    color: theme.palette.text.dim,
  },
  '& .hud-metric__value': {
    color: theme.palette.primary.main,
  },
}));
