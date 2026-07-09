import { Background } from '@/game/background';
import { GameProvider } from '@/game/context';
import { BulletPool, Spaceship } from '@/game/entities';

export function MainScene() {
  return (
    <GameProvider>
      <pixiContainer label="background-layer">
        <Background />
      </pixiContainer>
      <BulletPool />
      <Spaceship />
    </GameProvider>
  );
}
