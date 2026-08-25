import type { CSSProperties } from 'react';

import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { TypographyVariant } from './Typography.enums';

type TypographyRootProps = {
  $align?: CSSProperties['textAlign'];
  $color?: CSSProperties['color'];
  $fontSize?: CSSProperties['fontSize'];
  $variant: TypographyVariant;
};

function getVariantStyles(theme: Theme, variant: TypographyVariant) {
  const commonStyles = {
    fontFamily: theme.typography.fontFamily.display,
    fontWeight: theme.typography.fontWeight.regular,
  };

  if (variant === TypographyVariant.Body) {
    return {
      fontFamily: theme.typography.fontFamily.readable,
      fontWeight: theme.typography.fontWeight.regular,
      lineHeight: 1.65,
    };
  }

  if (variant === TypographyVariant.HudValue) {
    return {
      ...commonStyles,
      lineHeight: 1,
      textShadow: [
        `2px 2px 0 ${theme.palette.shadow.hard}`,
        '0 0 8px currentColor',
      ].join(', '),
    };
  }

  if (variant === TypographyVariant.ControlLabel) {
    return {
      ...commonStyles,
      lineHeight: 1.4,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
    };
  }

  if (variant === TypographyVariant.MainMenuTitle) {
    return {
      ...commonStyles,
      lineHeight: 1.4,
      letterSpacing: '5px',
      textShadow: [
        `4px 4px 0 ${theme.palette.shadow.hard}`,
        '8px 8px 0 rgba(0, 0, 0, 0.4)',
        `0 0 28px ${theme.palette.glow.magenta}`,
      ].join(', '),
      textTransform: 'uppercase',
    };
  }

  if (variant === TypographyVariant.MainMenuSubtitle) {
    return {
      ...commonStyles,
      lineHeight: 1.4,
      letterSpacing: '4px',
      textShadow: `0 0 8px ${theme.palette.glow.amber}`,
      textTransform: 'uppercase',
    };
  }

  if (variant === TypographyVariant.ModalTitle) {
    return {
      ...commonStyles,
      lineHeight: 1.4,
      letterSpacing: '3px',
      textShadow: `3px 3px 0 ${theme.palette.shadow.hard}`,
      textTransform: 'uppercase',
    };
  }

  if (variant === TypographyVariant.ModalSubtitle) {
    return {
      ...commonStyles,
      lineHeight: 1.4,
      letterSpacing: '4px',
      textShadow: 'var(--modal-subtitle-shadow)',
      textTransform: 'uppercase',
    };
  }

  return {
    ...commonStyles,
    lineHeight: 1,
    letterSpacing: '1px',
    textTransform: 'uppercase',
  };
}

export const TypographyRoot = styled('span', {
  shouldForwardProp: (prop) =>
    prop !== 'as' &&
    prop !== '$align' &&
    prop !== '$color' &&
    prop !== '$fontSize' &&
    prop !== '$variant',
})<TypographyRootProps>(({ $align, $color, $fontSize, $variant, theme }) => ({
  display: 'block',
  margin: 0,
  color: $color,
  fontSize: $fontSize,
  textAlign: $align,
  ...getVariantStyles(theme, $variant),
}));
