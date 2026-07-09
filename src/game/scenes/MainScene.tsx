import { Background } from '@/game/background';
import { GameProvider } from '@/game/context';
import { AsteroidPool, BulletPool, Spaceship } from '@/game/entities';

export function MainScene() {
  return (
    <GameProvider>
      <pixiContainer label="background-layer">
        <Background />
      </pixiContainer>
      <AsteroidPool />
      <BulletPool />
      <Spaceship />
    </GameProvider>
  );
}
