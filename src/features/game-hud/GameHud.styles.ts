import styled from '@emotion/styled';

export const GameHudRoot = styled.section(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.zIndex.hud,
  inset: 0,
  pointerEvents: 'none',
}));

export const GameHudMetrics = styled.div({
  position: 'absolute',
  top: '16px',
  right: '16px',
  left: '16px',
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  margin: 0,
});

export const GameHudActions = styled.div({
  position: 'absolute',
  top: '16px',
  right: '19px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '12px',
});

export const GameHudActionButtons = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  pointerEvents: 'auto',
});
