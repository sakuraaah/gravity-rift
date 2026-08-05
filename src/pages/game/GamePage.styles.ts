import styled from '@emotion/styled';

import { GAME_LAYOUT, LAYOUT_SCALE } from '@/game/constants';

export const GamePageRoot = styled.main(({ theme }) => ({
  position: 'relative',
  isolation: 'isolate',
  width: GAME_LAYOUT.Width * LAYOUT_SCALE,
  height: GAME_LAYOUT.Height * LAYOUT_SCALE,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.void,
}));
