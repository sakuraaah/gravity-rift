import { Background } from '@/game/background';
import { SpaceShip } from '@/game/entities';

export function MainScene() {
  return (
    <>
      <pixiContainer label="background-layer">
        <Background />
      </pixiContainer>
      <pixiContainer label="player-layer">
        <SpaceShip />
      </pixiContainer>
    </>
  );
}
