import { Button } from '@base-ui/react/button';
import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import type { PixelButtonVariant } from './PixelButton.types';

type ButtonRootProps = {
  $fullWidth: boolean;
  $variant: PixelButtonVariant;
};

type IconButtonRootProps = {
  $variant: PixelButtonVariant;
};

function getVariantStyles(theme: Theme, variant: PixelButtonVariant) {
  if (variant === 'secondary') {
    return {
      color: theme.palette.text.mid,
      backgroundColor: 'transparent',
      borderColor: theme.palette.border.amber,
      boxShadow: theme.shadows.buttonHard,
      '&:hover': {
        color: theme.palette.text.high,
        borderColor: theme.palette.secondary.main,
        boxShadow: `${theme.shadows.buttonHard}, 0 0 14px ${theme.palette.glow.amber}`,
      },
      '&:active': {
        backgroundColor: 'rgba(255, 178, 77, 0.1)',
        boxShadow: 'none',
        transform: 'translate(3px, 3px)',
      },
    };
  }

  if (variant === 'danger') {
    return {
      color: theme.palette.danger.contrastText,
      backgroundColor: theme.palette.danger.main,
      borderColor: 'transparent',
      boxShadow: `${theme.shadows.buttonHard}, 0 0 12px ${theme.palette.glow.danger}`,
      '&:hover': {
        filter: 'brightness(1.1)',
        boxShadow: `${theme.shadows.buttonHard}, 0 0 18px ${theme.palette.glow.danger}`,
      },
      '&:active': {
        boxShadow: `0 0 12px ${theme.palette.glow.danger}`,
        transform: 'translate(3px, 3px)',
      },
    };
  }

  return {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderColor: 'transparent',
    boxShadow: `${theme.shadows.buttonHard}, 0 0 12px ${theme.palette.glow.magenta}`,
    '&:hover': {
      filter: 'brightness(1.12)',
      boxShadow: `${theme.shadows.buttonHard}, 0 0 20px ${theme.palette.glow.magenta}`,
    },
    '&:active': {
      boxShadow: `0 0 12px ${theme.palette.glow.magenta}`,
      transform: 'translate(3px, 3px)',
    },
  };
}

function getButtonBaseStyles(theme: Theme, variant: PixelButtonVariant) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '2px',
    borderStyle: 'solid',
    cursor: 'pointer',
    ...getVariantStyles(theme, variant),
    '&[data-disabled]': {
      filter: 'grayscale(0.4)',
      boxShadow: 'none',
      opacity: theme.opacity.disabled,
      transform: 'none',
      cursor: 'not-allowed',
    },
  };
}

export const ButtonRoot = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$fullWidth' && prop !== '$variant',
})<ButtonRootProps>(({ $fullWidth, $variant, theme }) => ({
  position: 'relative',
  width: $fullWidth ? '100%' : 'auto',
  minHeight: '34px',
  gap: '9px',
  padding: '11px 15px',
  borderRadius: theme.radii.button,
  fontFamily: theme.typography.fontFamily.display,
  fontSize: theme.typography.fontSize.control,
  fontWeight: theme.typography.fontWeight.regular,
  lineHeight: 1,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  transition: [
    `filter ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
    `box-shadow ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
    `transform ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
  ].join(', '),
  '& .pixel-button__caret': {
    flex: '0 0 1.1em',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.border.selected}`,
    outlineOffset: '3px',
  },
  ...getButtonBaseStyles(theme, $variant),
}));

export const IconButtonRoot = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$variant',
})<IconButtonRootProps>(({ $variant, theme }) => ({
  width: '34px',
  height: '34px',
  padding: 0,
  borderRadius: theme.radii.iconButton,
  lineHeight: 0,
  transition: [
    `filter ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
    `color ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
    `border-color ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
    `box-shadow ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
    `transform ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
  ].join(', '),
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: '3px',
  },
  ...getButtonBaseStyles(theme, $variant),
}));
