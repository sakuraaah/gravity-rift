import { AnimatedSprite, Texture, Ticker } from 'pixi.js';

import { getLoadedBlackHoleAnimations } from '@/game/assets';
import { GAME_SCALE } from '@/game/constants';

import {
  BLACK_HOLE_ANIMATION_FPS,
  BLACK_HOLE_INITIAL_SPAWN,
} from './blackHole.constants';
import { BlackHoleAnimation } from './blackHole.enums';
import type { BlackHoleSpawnData } from './blackHole.types';

let blackHoleViewId = 0;

export class BlackHole extends AnimatedSprite {
  public isActive = false;

  public animation: BlackHoleAnimation = BlackHoleAnimation.Spawn;

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
    this.animation = BlackHoleAnimation.Spawn;
    this.textures = getLoadedBlackHoleAnimations()[this.animation];
    this.animationSpeed = BLACK_HOLE_ANIMATION_FPS / (Ticker.targetFPMS * 1000);
    this.loop = true;
    this.position.set(spawnData.location.x, spawnData.location.y);
    this.scale.set(GAME_SCALE);
    this.visible = true;
    this.isActive = true;
    this.gotoAndPlay(0);
  }

  public update(ticker: Ticker) {
    if (!this.isActive) {
      return;
    }

    super.update(ticker);
  }

  public reset() {
    this.removeFromParent();
    this.stop();
    this.animation = BlackHoleAnimation.Spawn;
    this.textures = [Texture.EMPTY];
    this.animationSpeed = 1;
    this.loop = true;
    this.position.set(
      BLACK_HOLE_INITIAL_SPAWN.location.x,
      BLACK_HOLE_INITIAL_SPAWN.location.y
    );
    this.scale.set(1);
    this.visible = false;
    this.isActive = false;
  }
}
