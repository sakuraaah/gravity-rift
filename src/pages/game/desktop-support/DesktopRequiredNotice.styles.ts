import styled from '@emotion/styled';

import { Typography } from '@/shared/ui/Typography';

export const DesktopRequiredNoticeRoot = styled.section(({ theme }) => ({
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  padding: 'clamp(16px, 5vw, 48px)',
  textAlign: 'center',
  background: [
    `radial-gradient(circle at 50% 44%, ${theme.palette.background.raised} 0%, transparent 48%)`,
    `linear-gradient(135deg, ${theme.palette.background.space}, ${theme.palette.background.void})`,
  ].join(', '),
  '&::before': {
    position: 'absolute',
    inset: 0,
    opacity: 0.22,
    backgroundImage: [
      `linear-gradient(${theme.palette.border.soft} 1px, transparent 1px)`,
      `linear-gradient(90deg, ${theme.palette.border.soft} 1px, transparent 1px)`,
    ].join(', '),
    backgroundSize: '32px 32px',
    maskImage: 'radial-gradient(circle at center, black 0%, transparent 72%)',
    content: '""',
    pointerEvents: 'none',
  },
}));

export const DesktopRequiredNoticeContent = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'min(100%, 620px)',
});

export const DesktopRequiredNoticeEyebrow = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 'clamp(7px, 1.3vw, 10px)',
  letterSpacing: 'clamp(1px, 0.35vw, 3px)',
  textShadow: `0 0 8px ${theme.palette.glow.amber}`,
}));

export const DesktopRequiredNoticeTitle = styled(Typography)(({ theme }) => ({
  maxWidth: '560px',
  marginTop: 'clamp(10px, 2.4vw, 22px)',
  color: theme.palette.primary.main,
  fontSize: 'clamp(14px, 3.4vw, 30px)',
  letterSpacing: 'clamp(1px, 0.4vw, 3px)',
  textShadow: [
    `3px 3px 0 ${theme.palette.shadow.hard}`,
    `0 0 22px ${theme.palette.glow.magenta}`,
  ].join(', '),
}));

export const DesktopRequiredNoticeDivider = styled.div(({ theme }) => ({
  width: 'clamp(72px, 16vw, 136px)',
  height: '2px',
  margin: 'clamp(10px, 2.5vw, 22px) 0',
  backgroundColor: theme.palette.energy.main,
  boxShadow: `0 0 9px ${theme.palette.glow.cyan}`,
}));

export const DesktopRequiredNoticeDescription = styled(Typography)(
  ({ theme }) => ({
    maxWidth: '540px',
    color: theme.palette.text.mid,
    fontSize: 'clamp(10px, 1.5vw, 14px)',
    lineHeight: 1.55,
  })
);
