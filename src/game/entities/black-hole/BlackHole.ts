import { AnimatedSprite, Texture, Ticker } from 'pixi.js';

import { getLoadedBlackHoleAnimations } from '@/game/assets';
import { GAME_SCALE } from '@/game/constants';
import {
  BLACK_HOLE_GROWTH_CONFIG,
  BlackHoleTransitionProbabilityRule,
  getBlackHoleTransitionAnimationSequence,
  sampleBlackHoleAnimationDurationMs,
  selectNextBlackHoleTransition,
} from '@/game/systems/black-hole-lifecycle';

import {
  BLACK_HOLE_ANIMATION_FPS,
  BLACK_HOLE_INITIAL_SPAWN,
  BLACK_HOLE_PHASE_BY_ANIMATION,
} from './blackHole.constants';
import { BlackHoleAnimation, type BlackHolePhase } from './blackHole.enums';
import type { BlackHoleSpawnData } from './blackHole.types';

let blackHoleViewId = 0;

export class BlackHole extends AnimatedSprite {
  public isActive = false;

  public isLifecycleComplete = false;

  public animation: BlackHoleAnimation = BlackHoleAnimation.Spawn;

  private readonly animationQueue: BlackHoleAnimation[] = [];

  private growthChance = BLACK_HOLE_GROWTH_CONFIG.initialChance;

  private remainingAnimationDurationMs = 0;

  public get phase(): BlackHolePhase {
    return BLACK_HOLE_PHASE_BY_ANIMATION[this.animation];
  }

  public constructor() {
    super({
      autoUpdate: false,
      loop: true,
      textures: [Texture.EMPTY],
    });

    this.label = `black-hole-${blackHoleViewId}`;
    blackHoleViewId += 1;
    this.anchor.set(0.5);
    this.eventMode = 'none';
    this.roundPixels = true;
    this.visible = false;
  }

  public init(data?: BlackHoleSpawnData) {
    const spawnData = data ?? BLACK_HOLE_INITIAL_SPAWN;

    this.stop();
    this.animationQueue.length = 0;
    this.growthChance = BLACK_HOLE_GROWTH_CONFIG.initialChance;
    this.remainingAnimationDurationMs = 0;
    this.isLifecycleComplete = false;
    this.animationSpeed = BLACK_HOLE_ANIMATION_FPS / (Ticker.targetFPMS * 1000);
    this.loop = true;
    this.position.set(spawnData.location.x, spawnData.location.y);
    this.scale.set(GAME_SCALE);
    this.visible = true;
    this.isActive = true;
    this.activateAnimation(BlackHoleAnimation.Spawn, 0);
  }

  public update(ticker: Ticker) {
    if (!this.isActive) {
      return;
    }

    super.update(ticker);

    this.remainingAnimationDurationMs -= ticker.deltaMS;

    if (this.remainingAnimationDurationMs > 0) {
      return;
    }

    const nextAnimation = this.dequeueNextAnimation();

    if (!nextAnimation) {
      this.isLifecycleComplete = true;
      this.isActive = false;
      this.stop();
      return;
    }

    const elapsedOverflowMs = -this.remainingAnimationDurationMs;

    this.activateAnimation(nextAnimation, this.currentFrame, elapsedOverflowMs);
  }

  public reset() {
    this.removeFromParent();
    this.stop();
    this.animationQueue.length = 0;
    this.animation = BlackHoleAnimation.Spawn;
    this.textures = [Texture.EMPTY];
    this.animationSpeed = 1;
    this.growthChance = BLACK_HOLE_GROWTH_CONFIG.initialChance;
    this.remainingAnimationDurationMs = 0;
    this.isLifecycleComplete = false;
    this.loop = true;
    this.position.set(
      BLACK_HOLE_INITIAL_SPAWN.location.x,
      BLACK_HOLE_INITIAL_SPAWN.location.y
    );
    this.scale.set(1);
    this.visible = false;
    this.isActive = false;
  }

  private activateAnimation(
    animation: BlackHoleAnimation,
    frame: number,
    elapsedOverflowMs = 0
  ) {
    const textures = getLoadedBlackHoleAnimations()[animation];

    this.animation = animation;
    this.textures = textures;
    this.remainingAnimationDurationMs =
      sampleBlackHoleAnimationDurationMs(animation) - elapsedOverflowMs;
    this.gotoAndPlay(frame % textures.length);
  }

  private dequeueNextAnimation(): BlackHoleAnimation | null {
    if (this.animationQueue.length === 0) {
      const transition = selectNextBlackHoleTransition(
        this.phase,
        this.growthChance
      );

      if (!transition) {
        return null;
      }

      if (
        transition.probabilityRule === BlackHoleTransitionProbabilityRule.Growth
      ) {
        this.growthChance *= BLACK_HOLE_GROWTH_CONFIG.chanceDecayRatio;
      }

      this.animationQueue.push(
        ...getBlackHoleTransitionAnimationSequence(
          this.phase,
          transition.nextPhase
        )
      );
    }

    return this.animationQueue.shift() ?? null;
  }
}
