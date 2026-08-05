import { AppScreenRenderer } from './AppScreenRenderer';
import { AppProviders } from './providers';

export default function App() {
  return (
    <AppProviders>
      <AppScreenRenderer />
    </AppProviders>
  );
}
