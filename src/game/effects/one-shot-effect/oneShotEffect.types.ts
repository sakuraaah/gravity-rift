import type { AnimationFrames } from '@/game/assets';
import type { AsteroidSize } from '@/game/entities';
import type { Vector2 } from '@/game/utils';

import { OneShotEffectKind } from './oneShotEffect.enums';

type OneShotEffectRequestBase = {
  position: Vector2;
};

export type OneShotEffectRequest =
  | (OneShotEffectRequestBase & {
      kind: typeof OneShotEffectKind.AsteroidExplosion;
      size: AsteroidSize;
    })
  | (OneShotEffectRequestBase & {
      kind: typeof OneShotEffectKind.BulletSpark;
    })
  | (OneShotEffectRequestBase & {
      kind: typeof OneShotEffectKind.DebrisBurst;
    })
  | (OneShotEffectRequestBase & {
      kind: typeof OneShotEffectKind.ShipExplosion;
    });

export type OneShotEffectInitData = {
  animationFrames: AnimationFrames;
  framesPerSecond: number;
  position: Vector2;
};
