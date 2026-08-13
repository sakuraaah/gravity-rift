import { Background } from '@/game/background';
import { GameProvider } from '@/game/context';
import { OneShotEffectPool } from '@/game/effects';
import {
  AsteroidPool,
  BlackHolePool,
  BulletPool,
  Spaceship,
} from '@/game/entities';
import { CollisionRunner, GameTimeRunner } from '@/game/runners';
import { GamePhase, useAppStore } from '@/store';

export function GameplayScene() {
  const isBackgroundAnimated = useAppStore(
    (state) => state.gamePhase === GamePhase.Running
  );

  return (
    <GameProvider>
      <GameTimeRunner />
      <Background isAnimated={isBackgroundAnimated} />
      <BlackHolePool />
      <AsteroidPool />
      <BulletPool />
      <Spaceship />
      <OneShotEffectPool />
      <CollisionRunner />
    </GameProvider>
  );
}
