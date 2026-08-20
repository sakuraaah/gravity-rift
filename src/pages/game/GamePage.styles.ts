import styled from '@emotion/styled';

import { GAME_LAYOUT, LAYOUT_SCALE } from '@/game/constants';

export const GamePageRoot = styled.main(({ theme }) => ({
  position: 'relative',
  isolation: 'isolate',
  boxSizing: 'content-box',
  width: GAME_LAYOUT.Width * LAYOUT_SCALE,
  height: GAME_LAYOUT.Height * LAYOUT_SCALE,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.border.neon}`,
  borderRadius: theme.radii.panel,
  outline: 'none',
  backgroundColor: theme.palette.background.void,
  boxShadow: `0 0 24px -8px ${theme.palette.glow.magenta}`,
}));
