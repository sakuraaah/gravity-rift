import styled from '@emotion/styled';

import { ArrowIcon } from '@/shared/icons';
import { Typography } from '@/shared/ui/Typography';

export const HudControlsRoot = styled.div({
  position: 'absolute',
  bottom: '16px',
  left: '18px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  opacity: 0.7,
});

export const HudControlHint = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const HudControlLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.mid,
  fontSize: '7px',
}));

export const HudControlArrowIcon = styled(ArrowIcon)({
  display: 'block',
});
