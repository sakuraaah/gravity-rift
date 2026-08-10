import { useEffect } from 'react';

import { useGameContext } from '@/game/context';
import { OneShotEffectKind } from '@/game/effects';
import { GamePhase, useAppStore } from '@/store';

import { DYING_DURATION_MS } from './dyingRunner.constants';

export function DyingRunner() {
  const gamePhase = useAppStore((state) => state.gamePhase);
  const endGame = useAppStore((state) => state.endGame);
  const { playOneShotEffect, spaceshipLocationRef } = useGameContext();

  useEffect(() => {
    if (gamePhase !== GamePhase.Dying) {
      return;
    }

    const { x, y } = spaceshipLocationRef.current;

    playOneShotEffect({
      kind: OneShotEffectKind.ShipExplosion,
      position: { x, y },
    });

    const timeoutId = window.setTimeout(endGame, DYING_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [endGame, gamePhase, playOneShotEffect, spaceshipLocationRef]);

  return null;
}
