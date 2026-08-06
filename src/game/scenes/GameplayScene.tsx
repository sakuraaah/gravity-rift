import { Background } from '@/game/background';
import { GameProvider } from '@/game/context';
import { OneShotEffectPool } from '@/game/effects';
import { AsteroidPool, BulletPool, Spaceship } from '@/game/entities';
import { CollisionRunner, GameTimeRunner } from '@/game/runners';

export function GameplayScene() {
  return (
    <GameProvider>
      <GameTimeRunner />
      <Background />
      <AsteroidPool />
      <BulletPool />
      <Spaceship />
      <OneShotEffectPool />
      <CollisionRunner />
    </GameProvider>
  );
}
