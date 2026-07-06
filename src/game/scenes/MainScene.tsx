import { Background } from '@/game/background/Background';
import { PlayerShip } from '@/game/entities/PlayerShip';

export function MainScene() {
  return (
    <>
      <pixiContainer label="background-layer">
        <Background />
      </pixiContainer>
      <pixiContainer label="player-layer">
        <PlayerShip />
      </pixiContainer>
    </>
  );
}
