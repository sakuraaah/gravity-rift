import type { CSSProperties } from 'react';

import styled from '@emotion/styled';

type GridRootProps = {
  $gap: CSSProperties['gap'];
  $templateColumns: CSSProperties['gridTemplateColumns'];
};

export const GridRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== '$gap' && prop !== '$templateColumns',
})<GridRootProps>(({ $gap, $templateColumns }) => ({
  display: 'grid',
  gridTemplateColumns: $templateColumns,
  gap: $gap,
}));
