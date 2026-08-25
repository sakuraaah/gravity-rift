import styled from '@emotion/styled';

import { GAME_LAYOUT, LAYOUT_SCALE } from '@/game/constants';
import { Typography } from '@/shared/ui/Typography';

export const GamePageRoot = styled.main({
  width: '100%',
});

export const GamePageHero = styled.div({
  display: 'grid',
  placeItems: 'center',
  minHeight: '80svh',
  padding: 'clamp(48px, 7vh, 80px) clamp(16px, 4vw, 48px)',
});

export const GamePageSurface = styled.section(({ theme }) => ({
  position: 'relative',
  isolation: 'isolate',
  width: '100%',
  maxWidth: GAME_LAYOUT.Width * LAYOUT_SCALE,
  aspectRatio: `${GAME_LAYOUT.Width} / ${GAME_LAYOUT.Height}`,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.border.neon}`,
  borderRadius: theme.radii.panel,
  outline: 'none',
  backgroundColor: theme.palette.background.void,
  boxShadow: `0 0 24px -8px ${theme.palette.glow.magenta}`,
}));

export const GamePageDescription = styled.section(({ theme }) => ({
  display: 'grid',
  gap: '34px',
  width: `min(calc(100% - clamp(32px, 8vw, 96px)), ${
    GAME_LAYOUT.Width * LAYOUT_SCALE
  }px)`,
  margin: '0 auto',
  padding: 'clamp(110px, 10vw, 144px) 0 clamp(104px, 14vw, 176px)',
  borderTop: `1px solid ${theme.palette.border.soft}`,
}));

export const GamePageDescriptionKicker = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.mid,
  fontSize: '13px',
  fontWeight: theme.typography.fontWeight.bold,
  letterSpacing: '1px',
  textTransform: 'uppercase',
}));

export const GamePageDescriptionBody = styled.div({
  display: 'grid',
  gap: '22px',
});

export const GamePageDescriptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.mid,
  fontSize: '13px',
  lineHeight: 1.75,
  letterSpacing: 'normal',
  textTransform: 'none',
}));

export const GamePageDescriptionControls = styled(GamePageDescriptionText)(
  ({ theme }) => ({
    paddingTop: '22px',
    color: theme.palette.text.mid,
    borderTop: `1px solid ${theme.palette.border.soft}`,
  })
);

export const GamePageDescriptionRoadmap = styled.section(({ theme }) => ({
  display: 'grid',
  gap: '22px',
  paddingTop: '30px',
  borderTop: `1px solid ${theme.palette.border.soft}`,
}));

export const GamePageDescriptionRoadmapList = styled.ul({
  display: 'grid',
  gap: '12px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const GamePageDescriptionRoadmapItem = styled(GamePageDescriptionText)({
  position: 'relative',
  paddingLeft: '18px',
  '&::before': {
    position: 'absolute',
    top: '0.75em',
    left: 0,
    width: '4px',
    height: '4px',
    backgroundColor: 'currentColor',
    content: '""',
  },
});
