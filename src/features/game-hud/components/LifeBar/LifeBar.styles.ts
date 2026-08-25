import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { LifeIcon as BaseLifeIcon } from '@/shared/icons';
import { Typography } from '@/shared/ui/Typography';

type LifeIconProps = {
  $animate: boolean;
};

const lifeLossFlash = keyframes({
  '0%, 34%, 68%': {
    color: 'var(--life-flash-color)',
    filter: 'drop-shadow(0 0 6px var(--life-flash-color))',
    opacity: 1,
  },
  '17%, 51%': {
    color: 'var(--life-active-color)',
    filter: 'drop-shadow(0 0 5px var(--life-active-glow))',
    opacity: 1,
  },
  '85%, 100%': {
    color: 'var(--life-inactive-color)',
    filter: 'none',
    opacity: 0.45,
  },
});

export const LifeBarRoot = styled.div({
  textAlign: 'right',
});

export const LifeBarLabel = styled(Typography)(({ theme }) => ({
  marginBottom: '8px',
  color: theme.palette.text.dim,
  fontSize: theme.typography.fontSize.hudLabel,
}));

export const LifeBarIcons = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '10px',
});

export const LifeIcon = styled(BaseLifeIcon, {
  shouldForwardProp: (prop) => prop !== '$animate',
})<LifeIconProps>(({ $animate, theme }) => ({
  '--life-active-color': theme.palette.primary.main,
  '--life-active-glow': theme.palette.glow.magenta,
  '--life-flash-color': theme.palette.text.high,
  '--life-inactive-color': theme.palette.text.dim,
  display: 'block',
  width: '24px',
  height: '21px',
  animation: $animate ? `${lifeLossFlash} 500ms steps(1, end) both` : 'none',
  '&.life-icon--filled': {
    color: 'var(--life-active-color)',
    filter: 'drop-shadow(0 0 5px var(--life-active-glow))',
    opacity: 1,
  },
  '&.life-icon--empty': {
    color: 'var(--life-inactive-color)',
    filter: 'none',
    opacity: 0.45,
  },
}));
