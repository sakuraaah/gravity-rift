import styled from '@emotion/styled';

import { Typography } from '@/shared/ui/Typography';

export const MainMenuRoot = styled.section(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.zIndex.dialog,
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: 'clamp(10px, 4vw, 36px)',
  textAlign: 'center',
}));

export const MainMenuSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 'clamp(5px, 1.2vw, 9px)',
  letterSpacing: 'clamp(1.5px, 0.4vw, 4px)',
}));

export const MainMenuTitle = styled(Typography)(({ theme }) => ({
  margin: 'clamp(8px, 1.9vw, 18px) 0 0',
  color: theme.palette.primary.main,
  fontSize: `clamp(18px, 4.6vw, ${theme.typography.fontSize.wordmark})`,
  letterSpacing: 'clamp(2px, 0.5vw, 5px)',
}));

export const MainMenuDivider = styled.div(({ theme }) => ({
  width: 'clamp(80px, 14vw, 130px)',
  height: 'clamp(2px, 0.3vw, 3px)',
  margin: 'clamp(8px, 2vw, 20px) auto clamp(10px, 2.7vw, 26px)',
  backgroundColor: theme.palette.secondary.main,
  boxShadow: `0 0 9px ${theme.palette.glow.amber}`,
}));

export const MainMenuControls = styled.div({
  width: 'min(82%, 268px)',
  margin: '0 auto',
});
