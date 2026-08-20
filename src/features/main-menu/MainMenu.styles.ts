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
  overflow: 'auto',
  padding: '36px',
  textAlign: 'center',
}));

export const MainMenuSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '9px',
}));

export const MainMenuTitle = styled(Typography)(({ theme }) => ({
  margin: '18px 0 0',
  color: theme.palette.primary.main,
  fontSize: theme.typography.fontSize.wordmark,
}));

export const MainMenuDivider = styled.div(({ theme }) => ({
  width: '130px',
  height: '3px',
  margin: '20px auto 26px',
  backgroundColor: theme.palette.secondary.main,
  boxShadow: `0 0 9px ${theme.palette.glow.amber}`,
}));

export const MainMenuControls = styled.div({
  width: 'min(100%, 268px)',
  margin: '0 auto',
});
