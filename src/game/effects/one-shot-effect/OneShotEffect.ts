import { AnimatedSprite, Texture, Ticker } from 'pixi.js';

import { GAME_SCALE } from '@/game/constants';

import type { OneShotEffectInitData } from './oneShotEffect.types';

let oneShotEffectViewId = 0;

export class OneShotEffect extends AnimatedSprite {
  public isActive = false;

  public constructor() {
    super({
      autoUpdate: false,
      loop: false,
      textures: [Texture.EMPTY],
    });

    this.label = `one-shot-effect-${oneShotEffectViewId}`;
    oneShotEffectViewId += 1;
    this.anchor.set(0.5);
    this.eventMode = 'none';
    this.onComplete = this.handleComplete;
    this.roundPixels = true;
    this.visible = false;
  }

  public init({
    animationFrames,
    framesPerSecond,
    position,
  }: OneShotEffectInitData) {
    this.stop();
    this.textures = animationFrames;
    this.animationSpeed = framesPerSecond / (Ticker.targetFPMS * 1000);
    this.position.set(position.x, position.y);
    this.scale.set(GAME_SCALE);
    this.visible = true;
    this.isActive = true;
    this.gotoAndPlay(0);
  }

  public reset() {
    this.removeFromParent();
    this.stop();
    this.textures = [Texture.EMPTY];
    this.animationSpeed = 1;
    this.position.set(0, 0);
    this.scale.set(1);
    this.visible = false;
    this.isActive = false;
  }

  private readonly handleComplete = () => {
    this.visible = false;
    this.isActive = false;
  };
}
