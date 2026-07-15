import { Background } from '@/game/background';
import { GameProvider } from '@/game/context';
import { AsteroidPool, BulletPool, Spaceship } from '@/game/entities';

import { CollisionRunner } from './CollisionRunner';

export function MainScene() {
  return (
    <GameProvider>
      <pixiContainer label="background-layer">
        <Background />
      </pixiContainer>
      <AsteroidPool />
      <BulletPool />
      <Spaceship />
      <CollisionRunner />
    </GameProvider>
  );
}
