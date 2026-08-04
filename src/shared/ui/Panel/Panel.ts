import styled from '@emotion/styled';

export const Panel = styled.div(({ theme }) => ({
  padding: '26px 28px',
  border: `1px solid ${theme.palette.border.neon}`,
  borderRadius: theme.radii.panel,
  backgroundColor: theme.palette.background.panel,
  boxShadow: theme.shadows.panel,
}));

export const PanelDivider = styled.div(({ theme }) => ({
  height: '1px',
  margin: '16px -28px 18px',
  backgroundColor: theme.palette.border.soft,
}));
