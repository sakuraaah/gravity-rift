import type { AnimationFrames } from '@/game/assets/types';
import { getSpritesheetAnimation, loadSpritesheet } from '@/game/assets/utils';
import { BlackHoleAnimation } from '@/game/entities/black-hole/blackHole.enums';

const BLACK_HOLE_ATLAS_URL = '/assets/sprites/black-hole.atlas.json';

export type BlackHoleAnimations = Record<BlackHoleAnimation, AnimationFrames>;

let blackHoleAnimations: BlackHoleAnimations | null = null;
let blackHoleAnimationsLoadPromise: Promise<BlackHoleAnimations> | null = null;

async function loadAnimations(): Promise<BlackHoleAnimations> {
  const spritesheet = await loadSpritesheet(BLACK_HOLE_ATLAS_URL);

  return {
    [BlackHoleAnimation.Spawn]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.Spawn
    ),
    [BlackHoleAnimation.SpawnToIdleA]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.SpawnToIdleA
    ),
    [BlackHoleAnimation.SpawnToIdleB]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.SpawnToIdleB
    ),
    [BlackHoleAnimation.Idle]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.Idle
    ),
    [BlackHoleAnimation.IdleToActiveA]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.IdleToActiveA
    ),
    [BlackHoleAnimation.IdleToActiveB]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.IdleToActiveB
    ),
    [BlackHoleAnimation.Active]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.Active
    ),
    [BlackHoleAnimation.ActiveToDangerA]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.ActiveToDangerA
    ),
    [BlackHoleAnimation.ActiveToDangerB]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.ActiveToDangerB
    ),
    [BlackHoleAnimation.Danger]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.Danger
    ),
    [BlackHoleAnimation.IdleToCollapseA]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.IdleToCollapseA
    ),
    [BlackHoleAnimation.IdleToCollapseB]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.IdleToCollapseB
    ),
    [BlackHoleAnimation.Collapse]: getSpritesheetAnimation(
      spritesheet,
      BlackHoleAnimation.Collapse
    ),
  };
}

export function loadBlackHoleAssets() {
  if (blackHoleAnimations) {
    return Promise.resolve(blackHoleAnimations);
  }

  if (!blackHoleAnimationsLoadPromise) {
    blackHoleAnimationsLoadPromise = loadAnimations()
      .then((animations) => {
        blackHoleAnimations = animations;
        return animations;
      })
      .catch((error: unknown) => {
        blackHoleAnimationsLoadPromise = null;
        throw error;
      });
  }

  return blackHoleAnimationsLoadPromise;
}

export function getLoadedBlackHoleAnimations() {
  if (!blackHoleAnimations) {
    throw new Error(
      'Black hole assets must be loaded before rendering the game.'
    );
  }

  return blackHoleAnimations;
}
