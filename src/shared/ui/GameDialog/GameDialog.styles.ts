import { Dialog } from '@base-ui/react/dialog';
import styled from '@emotion/styled';

export const DialogBackdrop = styled(Dialog.Backdrop)(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.zIndex.dialogBackdrop,
  inset: 0,
  background:
    'radial-gradient(ellipse at center, rgba(8, 3, 15, 0.52), rgba(8, 3, 15, 0.86))',
  opacity: 1,
  transition: `opacity ${theme.transitions.duration.normal} ${theme.transitions.easing.standard}`,
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
  },
}));

export const DialogViewport = styled(Dialog.Viewport)(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.zIndex.dialog,
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  padding: '24px',
}));

export const DialogPopup = styled(Dialog.Popup)(({ theme }) => ({
  width: 'min(100%, 440px)',
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

export const DialogTitle = styled(Dialog.Title)(({ theme }) => ({
  margin: 0,
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

export const DialogDescription = styled(Dialog.Description)(({ theme }) => ({
  margin: '16px 0 0',
  color: theme.palette.text.mid,
  fontFamily: theme.typography.fontFamily.body,
  fontSize: theme.typography.fontSize.body,
  lineHeight: 1.7,
  textAlign: 'center',
}));
