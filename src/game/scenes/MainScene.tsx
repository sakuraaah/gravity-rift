import { Background } from '@/game/background';
import { Spaceship } from '@/game/entities';

export function MainScene() {
  return (
    <>
      <pixiContainer label="background-layer">
        <Background />
      </pixiContainer>
      <pixiContainer label="player-layer">
        <Spaceship />
      </pixiContainer>
    </>
  );
}
