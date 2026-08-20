import styled from '@emotion/styled';

import { LifeIcon as BaseLifeIcon } from '@/shared/icons';
import { Typography } from '@/shared/ui/Typography';

type LifeIconProps = {
  $filled: boolean;
};

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
  shouldForwardProp: (prop) => prop !== '$filled',
})<LifeIconProps>(({ $filled, theme }) => ({
  display: 'block',
  width: '24px',
  height: '21px',
  color: $filled ? theme.palette.primary.main : theme.palette.text.dim,
  filter: $filled
    ? `drop-shadow(0 0 5px ${theme.palette.glow.magenta})`
    : 'none',
  opacity: $filled ? 1 : 0.45,
}));
