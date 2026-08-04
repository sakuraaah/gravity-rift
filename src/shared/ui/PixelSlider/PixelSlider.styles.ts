import type { ComponentType } from 'react';

import { Slider } from '@base-ui/react/slider';
import styled from '@emotion/styled';

const NumberSliderRoot = Slider.Root as ComponentType<
  Slider.Root.Props<number>
>;

export const SliderRoot = styled(NumberSliderRoot)(({ theme }) => ({
  display: 'grid',
  width: '220px',
  gap: '8px',
  '&[data-disabled]': {
    opacity: theme.opacity.disabled,
  },
}));

export const SliderHeader = styled.div({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '12px',
});

export const SliderLabel = styled(Slider.Label)(({ theme }) => ({
  color: theme.palette.text.high,
  fontFamily: theme.typography.fontFamily.display,
  fontSize: theme.typography.fontSize.control,
  lineHeight: 1.4,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
}));

export const SliderValue = styled(Slider.Value)(({ theme }) => ({
  color: theme.palette.text.dim,
  fontFamily: theme.typography.fontFamily.body,
  fontSize: theme.typography.fontSize.body,
}));

export const SliderControl = styled(Slider.Control)({
  display: 'flex',
  height: '16px',
  alignItems: 'center',
  touchAction: 'none',
});

export const SliderTrack = styled(Slider.Track)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '6px',
  border: `1px solid ${theme.palette.border.soft}`,
  backgroundColor: 'rgba(0, 0, 0, 0.32)',
}));

export const SliderIndicator = styled(Slider.Indicator)(({ theme }) => ({
  position: 'absolute',
  height: '100%',
  backgroundColor: theme.palette.secondary.main,
  boxShadow: `0 0 9px ${theme.palette.glow.amber}`,
}));

export const SliderThumb = styled(Slider.Thumb)(({ theme }) => ({
  width: '14px',
  height: '14px',
  border: `2px solid ${theme.palette.secondary.main}`,
  borderRadius: 0,
  backgroundColor: theme.palette.text.high,
  cursor: 'grab',
  transition: `box-shadow ${theme.transitions.duration.fast} ${theme.transitions.easing.standard}`,
  '&:hover, &[data-dragging]': {
    filter: 'brightness(1.15)',
    boxShadow: `0 0 10px ${theme.palette.glow.amber}`,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: '3px',
  },
  '&[data-dragging]': {
    cursor: 'grabbing',
  },
  '[data-disabled] &': {
    boxShadow: 'none',
    cursor: 'not-allowed',
  },
}));
