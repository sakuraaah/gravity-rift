import { PlayerShip } from "../entities/PlayerShip";
import { Background } from "../background/Background";

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
