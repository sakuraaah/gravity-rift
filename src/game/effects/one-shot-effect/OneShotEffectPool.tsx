import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useTick } from '@pixi/react';

import type { Container, Pool, Ticker } from 'pixi.js';
import { Pool as PixiPool } from 'pixi.js';

import { useGameContext } from '@/game/context';
import { GAME_TICK_PRIORITY } from '@/game/systems';
import { GamePhase, useAppStore } from '@/store';

import { OneShotEffect } from './OneShotEffect';
import { ONE_SHOT_EFFECT_FPS_BY_KIND } from './oneShotEffect.constants';
import type {
  OneShotEffectInitData,
  OneShotEffectRequest,
} from './oneShotEffect.types';
import { getAnimationFramesForRequest } from './oneShotEffect.utils';

export function OneShotEffectPool() {
  const { pendingOneShotEffectsRef } = useGameContext();
  const effectLayerRef = useRef<Container>(null);
  const activeEffectsRef = useRef<OneShotEffect[]>([]);
  const effectPool = useMemo<Pool<OneShotEffect, OneShotEffectInitData>>(
    () => new PixiPool(OneShotEffect),
    []
  );

  const releaseEffect = useCallback(
    (effect: OneShotEffect) => {
      effectPool.return(effect);
    },
    [effectPool]
  );

  const spawnEffect = useCallback(
    (request: OneShotEffectRequest) => {
      const effectLayer = effectLayerRef.current;

      if (!effectLayer) {
        return false;
      }

      const effect = effectPool.get({
        animationFrames: getAnimationFramesForRequest(request),
        framesPerSecond: ONE_SHOT_EFFECT_FPS_BY_KIND[request.kind],
        position: request.position,
      });

      effectLayer.addChild(effect);
      activeEffectsRef.current.push(effect);

      return true;
    },
    [effectPool]
  );

  const updateEffects = useCallback(
    (ticker: Ticker) => {
      if (useAppStore.getState().gamePhase !== GamePhase.Running) {
        return;
      }

      for (
        let index = activeEffectsRef.current.length - 1;
        index >= 0;
        index -= 1
      ) {
        const effect = activeEffectsRef.current[index];

        effect.update(ticker);

        if (effect.isActive) {
          continue;
        }

        releaseEffect(effect);
        activeEffectsRef.current.splice(index, 1);
      }

      if (!effectLayerRef.current) {
        return;
      }

      const pendingEffects = pendingOneShotEffectsRef.current.splice(0);

      pendingEffects.forEach((request) => {
        spawnEffect(request);
      });
    },
    [pendingOneShotEffectsRef, releaseEffect, spawnEffect]
  );

  useEffect(() => {
    return () => {
      activeEffectsRef.current.forEach(releaseEffect);
      activeEffectsRef.current = [];
      pendingOneShotEffectsRef.current = [];
      effectPool.clear();
    };
  }, [effectPool, pendingOneShotEffectsRef, releaseEffect]);

  useTick({
    callback: updateEffects,
    priority: GAME_TICK_PRIORITY.EffectUpdate,
  });

  return <pixiContainer ref={effectLayerRef} label="one-shot-effects-layer" />;
}
