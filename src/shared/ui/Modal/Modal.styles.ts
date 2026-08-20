import type { CSSProperties } from 'react';

import { Dialog } from '@base-ui/react/dialog';
import styled from '@emotion/styled';

import { Typography } from '@/shared/ui/Typography';

import { ModalHeaderTone } from './Modal.enums';
import type { ModalBackdropStrength } from './Modal.types';

type ModalOverlayProps = {
  $contained: boolean;
};

type ModalBackdropProps = ModalOverlayProps & {
  $strength: ModalBackdropStrength;
};

type ModalPopupProps = {
  $maxWidth: CSSProperties['maxWidth'];
};

type ModalHeaderProps = {
  $tone: ModalHeaderTone;
};

export const ModalBackdrop = styled(Dialog.Backdrop, {
  shouldForwardProp: (prop) => prop !== '$contained' && prop !== '$strength',
})<ModalBackdropProps>(({ $contained, $strength, theme }) => ({
  position: $contained ? 'absolute' : 'fixed',
  zIndex: theme.zIndex.dialogBackdrop,
  inset: 0,
  background:
    $strength === 'strong'
      ? 'radial-gradient(ellipse at center, rgba(8, 3, 15, 0.3), rgba(8, 3, 15, 0.58))'
      : 'radial-gradient(ellipse at center, rgba(8, 3, 15, 0.18), rgba(8, 3, 15, 0.42))',
  opacity: 1,
  transition: `opacity ${theme.transitions.duration.normal} ${theme.transitions.easing.standard}`,
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
  },
}));

export const ModalViewport = styled(Dialog.Viewport, {
  shouldForwardProp: (prop) => prop !== '$contained',
})<ModalOverlayProps>(({ $contained, theme }) => ({
  position: $contained ? 'absolute' : 'fixed',
  zIndex: theme.zIndex.dialog,
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  padding: '24px',
}));

export const ModalPopup = styled(Dialog.Popup, {
  shouldForwardProp: (prop) => prop !== '$maxWidth',
})<ModalPopupProps>(({ $maxWidth, theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: $maxWidth,
  maxHeight: 'calc(100% - 48px)',
  overflow: 'auto',
  padding: '26px 28px',
  border: `1px solid ${theme.palette.border.neon}`,
  borderRadius: theme.radii.panel,
  outline: 'none',
  color: theme.palette.text.mid,
  backgroundColor: theme.palette.background.panel,
  boxShadow: theme.shadows.panel,
  transform: 'scale(1)',
  opacity: 1,
  transition: [
    `opacity ${theme.transitions.duration.normal} ${theme.transitions.easing.standard}`,
    `transform ${theme.transitions.duration.normal} ${theme.transitions.easing.standard}`,
  ].join(', '),
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
    transform: 'scale(0.98)',
  },
}));

export const ModalHeader = styled.div<ModalHeaderProps>(({ $tone, theme }) => {
  const colors = {
    [ModalHeaderTone.Critical]: {
      subtitleGap: '12px',
      subtitle: theme.palette.text.dim,
      subtitleShadow: 'none',
      title: theme.palette.danger.main,
    },
    [ModalHeaderTone.Default]: {
      subtitleGap: '14px',
      subtitle: theme.palette.primary.main,
      subtitleShadow: `0 0 8px ${theme.palette.glow.magenta}`,
      title: theme.palette.text.high,
    },
  }[$tone];

  return {
    '--modal-subtitle-color': colors.subtitle,
    '--modal-subtitle-gap': colors.subtitleGap,
    '--modal-subtitle-shadow': colors.subtitleShadow,
    '--modal-title-color': colors.title,
  };
});

export const ModalTitle = styled(Typography)(({ theme }) => ({
  padding: '0 38px',
  color: 'var(--modal-title-color)',
  fontSize: theme.typography.fontSize.title,
  textAlign: 'center',
}));

export const ModalSubtitle = styled(Typography)({
  margin: '0 0 var(--modal-subtitle-gap)',
  color: 'var(--modal-subtitle-color)',
  fontSize: '9px',
  textAlign: 'center',
});

export const ModalDivider = styled.div(({ theme }) => ({
  height: '1px',
  margin: '16px -28px 18px',
  backgroundColor: theme.palette.border.soft,
}));

export const ModalContent = styled.div({
  width: '100%',
});

export const ModalClosePosition = styled.div({
  position: 'absolute',
  top: '14px',
  right: '14px',
});
