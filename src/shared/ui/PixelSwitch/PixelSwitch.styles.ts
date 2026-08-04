import { Switch } from '@base-ui/react/switch';
import styled from '@emotion/styled';

export const SwitchLabel = styled.label(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '12px',
  color: theme.palette.text.high,
  fontFamily: theme.typography.fontFamily.display,
  fontSize: theme.typography.fontSize.control,
  lineHeight: 1.4,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  '&:has([data-disabled])': {
    cursor: 'not-allowed',
  },
}));

export const SwitchRoot = styled(Switch.Root)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  flex: '0 0 auto',
  width: '44px',
  height: '22px',
  alignItems: 'center',
  padding: '2px',
  border: `2px solid ${theme.palette.border.soft}`,
  borderRadius: theme.radii.control,
  backgroundColor: 'rgba(0, 0, 0, 0.28)',
  cursor: 'pointer',
  transition: [
    `border-color ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
    `background-color ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
  ].join(', '),
  '&[data-checked]': {
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'rgba(255, 178, 77, 0.16)',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: '3px',
  },
  '&[data-disabled]': {
    opacity: theme.opacity.disabled,
    cursor: 'not-allowed',
  },
}));

export const SwitchThumb = styled(Switch.Thumb)(({ theme }) => ({
  display: 'block',
  width: '14px',
  height: '14px',
  backgroundColor: theme.palette.text.dim,
  transform: 'translateX(0)',
  transition: [
    `background-color ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
    `box-shadow ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
    `transform ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
  ].join(', '),
  '[data-checked] &': {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: `0 0 8px ${theme.palette.glow.amber}`,
    transform: 'translateX(22px)',
  },
  '[data-disabled] &': {
    boxShadow: 'none',
  },
}));
