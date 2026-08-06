import { GamePage } from '@/pages';

import { AppProviders } from './providers';

export default function App() {
  return (
    <AppProviders>
      <GamePage />
    </AppProviders>
  );
}
