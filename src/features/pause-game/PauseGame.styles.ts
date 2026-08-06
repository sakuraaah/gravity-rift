import styled from '@emotion/styled';

export const PauseButtonPosition = styled.div(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.zIndex.hud,
  top: '16px',
  right: '16px',
}));

export const PauseControls = styled.div({
  width: 'min(100%, 220px)',
  margin: '0 auto',
});
