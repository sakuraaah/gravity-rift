import type { ComponentType } from 'react';

import { BackgroundScene, GameplayScene } from '@/game/scenes';
import { AppScreen, useAppStore } from '@/store';

const SCENE_BY_SCREEN = {
  [AppScreen.Game]: GameplayScene,
  [AppScreen.MainMenu]: BackgroundScene,
} as const satisfies Record<AppScreen, ComponentType>;

export function useScene() {
  const screen = useAppStore((state) => state.screen);

  return SCENE_BY_SCREEN[screen];
}
