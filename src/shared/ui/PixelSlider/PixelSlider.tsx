import type { ReactNode } from 'react';

import { Slider } from '@base-ui/react/slider';

import { TypographyVariant } from '@/shared/ui/Typography';

import {
  SliderControl,
  SliderHeader,
  SliderIndicator,
  SliderLabel,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from './PixelSlider.styles';

export type PixelSliderProps = Omit<Slider.Root.Props<number>, 'children'> & {
  label: ReactNode;
  thumbLabel: string;
};

export function PixelSlider({
  label,
  thumbLabel,
  ...sliderProps
}: PixelSliderProps) {
  return (
    <SliderRoot {...sliderProps}>
      <SliderHeader>
        <SliderLabel
          component={Slider.Label}
          variant={TypographyVariant.ControlLabel}
        >
          {label}
        </SliderLabel>
        <SliderValue />
      </SliderHeader>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label={thumbLabel} />
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  );
}
