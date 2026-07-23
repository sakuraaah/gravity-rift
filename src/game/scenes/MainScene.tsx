import { Background } from '@/game/background';
import { GameProvider } from '@/game/context';
import { OneShotEffectPool } from '@/game/effects';
import { AsteroidPool, BulletPool, Spaceship } from '@/game/entities';

import { CollisionRunner } from './CollisionRunner';
import { GameTimeRunner } from './GameTimeRunner';

export function MainScene() {
  return (
    <GameProvider>
      <GameTimeRunner />
      <pixiContainer label="background-layer">
        <Background />
      </pixiContainer>
      <AsteroidPool />
      <BulletPool />
      <Spaceship />
      <OneShotEffectPool />
      <CollisionRunner />
    </GameProvider>
  );
}
