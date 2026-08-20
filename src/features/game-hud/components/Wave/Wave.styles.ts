import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const waveValueFlash = keyframes({
  '0%, 24%, 50%, 74%': {
    color: 'var(--wave-flash-color)',
  },
  '25%, 49%, 75%, 100%': {
    color: 'var(--wave-value-color)',
  },
});

const waveBracketBlink = keyframes({
  '0%, 24%, 50%, 74%': {
    opacity: 1,
  },
  '25%, 49%, 75%, 100%': {
    opacity: 0,
  },
});

type WaveRootProps = {
  $animate: boolean;
};

export const WaveRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== '$animate',
})<WaveRootProps>(({ $animate, theme }) => ({
  '--wave-flash-color': theme.palette.text.high,
  '--wave-value-color': theme.palette.secondary.main,
  textAlign: 'center',
  '& .hud-metric__label': {
    color: theme.palette.text.dim,
  },
  '& .hud-metric__value': {
    position: 'relative',
    width: 'fit-content',
    margin: '8px auto 0',
    color: 'var(--wave-value-color)',
    animation: $animate ? `${waveValueFlash} 400ms steps(1, end) both` : 'none',
    '&::before, &::after': {
      position: 'absolute',
      top: 0,
      color: 'var(--wave-flash-color)',
      opacity: 0,
      animation: $animate
        ? `${waveBracketBlink} 400ms steps(1, end) both`
        : 'none',
      pointerEvents: 'none',
    },
    '&::before': {
      right: 'calc(100% + 4px)',
      content: '"["',
    },
    '&::after': {
      left: 'calc(100% + 4px)',
      content: '"]"',
    },
  },
}));
