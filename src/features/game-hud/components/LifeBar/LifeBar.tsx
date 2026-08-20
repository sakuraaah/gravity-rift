import { TypographyVariant } from '@/shared/ui/Typography';

import {
  LifeBarIcons,
  LifeBarLabel,
  LifeBarRoot,
  LifeIcon,
} from './LifeBar.styles';
import type { LifeBarProps } from './LifeBar.types';

export function LifeBar({ currentLives, totalLives }: LifeBarProps) {
  const lifeSlots = Math.max(0, Math.floor(totalLives));
  const filledLives = Math.min(
    lifeSlots,
    Math.max(0, Math.floor(currentLives))
  );

  return (
    <LifeBarRoot aria-label={`${filledLives} of ${lifeSlots} lives remaining`}>
      <LifeBarLabel component="div" variant={TypographyVariant.HudLabel}>
        Lives
      </LifeBarLabel>
      <LifeBarIcons aria-hidden="true">
        {Array.from({ length: lifeSlots }, (_, index) => {
          const isFilled = index < filledLives;

          return <LifeIcon key={index} $filled={isFilled} />;
        })}
      </LifeBarIcons>
    </LifeBarRoot>
  );
}
