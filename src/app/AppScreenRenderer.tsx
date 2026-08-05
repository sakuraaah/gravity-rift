import { GamePage } from '@/pages';
import { AppScreen, useAppStore } from '@/store';

export function AppScreenRenderer() {
  const runId = useAppStore((state) => state.runId);
  const screen = useAppStore((state) => state.screen);

  if (screen === AppScreen.MainMenu) {
    return null;
  }

  return <GamePage key={runId} />;
}
