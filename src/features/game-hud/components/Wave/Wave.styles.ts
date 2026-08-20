import styled from '@emotion/styled';

export const WaveRoot = styled.div(({ theme }) => ({
  textAlign: 'center',
  '& .hud-metric__label': {
    color: theme.palette.text.dim,
  },
  '& .hud-metric__value': {
    color: theme.palette.secondary.main,
  },
}));
