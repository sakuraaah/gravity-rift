import { Background } from '@/game/background';
import { GameProvider } from '@/game/context';
import { Spaceship } from '@/game/entities';

export function MainScene() {
  return (
    <GameProvider>
      <pixiContainer label="background-layer">
        <Background />
      </pixiContainer>
      <pixiContainer label="player-layer">
        <Spaceship />
      </pixiContainer>
    </GameProvider>
  );
}
