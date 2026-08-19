import styled from '@emotion/styled';

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

export const MainMenuSubtitle = styled.p(({ theme }) => ({
  margin: 0,
  color: theme.palette.secondary.main,
  fontFamily: theme.typography.fontFamily.display,
  fontSize: '9px',
  lineHeight: 1.4,
  letterSpacing: '4px',
  textShadow: `0 0 8px ${theme.palette.glow.amber}`,
  textTransform: 'uppercase',
}));

export const MainMenuTitle = styled.h1(({ theme }) => ({
  margin: '18px 0 0',
  color: theme.palette.primary.main,
  fontFamily: theme.typography.fontFamily.display,
  fontSize: theme.typography.fontSize.wordmark,
  fontWeight: theme.typography.fontWeight.regular,
  lineHeight: 1.4,
  letterSpacing: '5px',
  textShadow: [
    `4px 4px 0 ${theme.palette.shadow.hard}`,
    '8px 8px 0 rgba(0, 0, 0, 0.4)',
    `0 0 28px ${theme.palette.glow.magenta}`,
  ].join(', '),
  textTransform: 'uppercase',
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
