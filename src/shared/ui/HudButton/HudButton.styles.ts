import styled from '@emotion/styled';

import { Typography } from '@/shared/ui/Typography';

import type { HudButtonProps } from './HudButton.types';

type HudButtonRootProps = {
  $active: boolean;
  $size: NonNullable<HudButtonProps['size']>;
  $wide: boolean;
};

export const HudButtonRoot = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== '$active' && prop !== '$size' && prop !== '$wide',
})<HudButtonRootProps>(({ $active, $size, $wide, theme }) => {
  const isSmall = $size === 'small';

  return {
    display: 'inline-flex',
    minWidth: $wide ? (isSmall ? '42px' : '62px') : isSmall ? '20px' : '26px',
    height: isSmall ? '20px' : '26px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: $active
      ? theme.palette.border.selected
      : theme.palette.border.soft,
    borderRadius: theme.radii.control,
    color: $active ? theme.palette.text.high : theme.palette.text.mid,
    backgroundColor: $active
      ? 'rgba(255, 255, 255, 0.16)'
      : 'rgba(255, 255, 255, 0.05)',
    boxShadow: $active ? '0 0 9px rgba(255, 255, 255, 0.22)' : 'none',
    fontSize: isSmall ? '6px' : theme.typography.fontSize.small,
    lineHeight: 0,
    pointerEvents: 'none',
    userSelect: 'none',
  };
});
