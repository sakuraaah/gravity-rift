import GameCanvas from '@/game/GameCanvas';

import { AppProviders } from './providers';

export default function App() {
  return (
    <AppProviders>
      <GameCanvas />
    </AppProviders>
  );
}
