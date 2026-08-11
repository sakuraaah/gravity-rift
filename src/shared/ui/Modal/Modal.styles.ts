import type { CSSProperties } from 'react';

import { Dialog } from '@base-ui/react/dialog';
import styled from '@emotion/styled';

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

export const ModalBackdrop = styled(Dialog.Backdrop, {
  shouldForwardProp: (prop) => prop !== '$contained' && prop !== '$strength',
})<ModalBackdropProps>(({ $contained, $strength, theme }) => ({
  position: $contained ? 'absolute' : 'fixed',
  zIndex: theme.zIndex.dialogBackdrop,
  inset: 0,
  background:
    $strength === 'strong'
      ? 'radial-gradient(ellipse at center, rgba(8, 3, 15, 0.76), rgba(8, 3, 15, 0.96))'
      : 'radial-gradient(ellipse at center, rgba(8, 3, 15, 0.52), rgba(8, 3, 15, 0.86))',
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

export const ModalTitle = styled(Dialog.Title)(({ theme }) => ({
  margin: 0,
  padding: '0 38px',
  color: theme.palette.text.high,
  fontFamily: theme.typography.fontFamily.display,
  fontSize: theme.typography.fontSize.title,
  fontWeight: theme.typography.fontWeight.regular,
  lineHeight: 1.4,
  letterSpacing: '3px',
  textAlign: 'center',
  textShadow: `3px 3px 0 ${theme.palette.shadow.hard}`,
  textTransform: 'uppercase',
}));

export const ModalDescription = styled(Dialog.Description)(({ theme }) => ({
  margin: '16px 0 0',
  color: theme.palette.text.mid,
  fontFamily: theme.typography.fontFamily.body,
  fontSize: theme.typography.fontSize.body,
  lineHeight: 1.7,
  textAlign: 'center',
}));

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
