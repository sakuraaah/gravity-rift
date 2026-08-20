import styled from '@emotion/styled';

import { Typography } from '@/shared/ui/Typography';

export const HudMetricRoot = styled.dl({
  minWidth: '64px',
  margin: 0,
});

export const HudMetricLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.fontSize.hudLabel,
}));

export const HudMetricValue = styled(Typography)(({ theme }) => ({
  margin: '8px 0 0',
  fontSize: theme.typography.fontSize.hudValue,
}));
