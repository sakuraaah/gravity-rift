import { AnimatedSprite, Texture, Ticker } from 'pixi.js';

import { Circle } from 'check2d';

import { getLoadedBlackHoleAnimations } from '@/game/assets';
import { GAME_SCALE } from '@/game/constants';
import {
  BLACK_HOLE_GROWTH_CONFIG,
  BlackHoleTransitionProbabilityRule,
  getBlackHoleTransitionAnimationSequence,
  sampleBlackHoleAnimationDurationMs,
  selectNextBlackHoleTransition,
} from '@/game/systems/black-hole-lifecycle';
import { CollisionKind } from '@/game/systems/collision';
import type {
  CollisionParticipant,
  CollisionWorld,
} from '@/game/systems/collision';

import {
  BLACK_HOLE_ANIMATION_FPS,
  BLACK_HOLE_HITBOX_RADIUS,
  BLACK_HOLE_INITIAL_SPAWN,
  BLACK_HOLE_PHASE_BY_ANIMATION,
} from './blackHole.constants';
import { BlackHoleAnimation, BlackHolePhase } from './blackHole.enums';
import type { BlackHoleSpawnData } from './blackHole.types';

let blackHoleViewId = 0;

export class BlackHole extends AnimatedSprite {
  public isActive = false;

  public isLifecycleComplete = false;

  public animation: BlackHoleAnimation = BlackHoleAnimation.Spawn;

  private readonly animationQueue: BlackHoleAnimation[] = [];

  private readonly collider: Circle<CollisionParticipant>;

  private entityId: string | null = null;

  private growthChance = BLACK_HOLE_GROWTH_CONFIG.initialChance;

  private isColliderRegistered = false;

  private remainingAnimationDurationMs = 0;

  public get isLethal(): boolean {
    return (
      this.phase === BlackHolePhase.Active ||
      this.phase === BlackHolePhase.Danger
    );
  }

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
    this.collider = new Circle<CollisionParticipant>(
      BLACK_HOLE_INITIAL_SPAWN.location,
      BLACK_HOLE_HITBOX_RADIUS
    );
  }

  public init(data?: BlackHoleSpawnData) {
    const spawnData = data ?? BLACK_HOLE_INITIAL_SPAWN;

    this.stop();
    this.animationQueue.length = 0;
    this.entityId = crypto.randomUUID();
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

  public registerCollider(collisionWorld: CollisionWorld) {
    if (this.isColliderRegistered) {
      return;
    }

    if (this.entityId === null) {
      throw new Error(
        'Cannot register a black hole collider before initialization'
      );
    }

    collisionWorld.register(this.collider, {
      id: this.entityId,
      kind: CollisionKind.BlackHole,
    });
    this.isColliderRegistered = true;
  }

  public syncCollider(collisionWorld: CollisionWorld) {
    if (!this.isLethal) {
      this.unregisterCollider(collisionWorld);
      return;
    }

    this.registerCollider(collisionWorld);
    collisionWorld.sync(this.collider, {
      x: this.position.x,
      y: this.position.y,
    });
  }

  public unregisterCollider(collisionWorld: CollisionWorld) {
    if (!this.isColliderRegistered) {
      return;
    }

    collisionWorld.unregister(this.collider);
    this.isColliderRegistered = false;
  }

  public reset() {
    this.removeFromParent();
    this.stop();
    this.animationQueue.length = 0;
    this.animation = BlackHoleAnimation.Spawn;
    this.textures = [Texture.EMPTY];
    this.animationSpeed = 1;
    this.entityId = null;
    this.growthChance = BLACK_HOLE_GROWTH_CONFIG.initialChance;
    this.isColliderRegistered = false;
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
