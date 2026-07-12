import { Sprite, Texture } from 'pixi.js';

import { getLoadedAsteroidTextures } from '@/game/assets';
import type { Vector2 } from '@/game/utils';
import { randomInteger } from '@/game/utils';

import {
  ASTEROID_INITIAL_SPAWN,
  ASTEROID_RADIUS_BY_SIZE,
} from './asteroid.constants';
import type { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

let asteroidViewId = 0;

export class Asteroid extends Sprite {
  public isActive = false;

  private hasEnteredBounds = false;

  private velocity: Vector2 = { x: 0, y: 0 };

  public constructor() {
    super(Texture.EMPTY);

    this.label = `asteroid-${asteroidViewId}`;
    asteroidViewId += 1;
    this.anchor.set(0.5);
    this.roundPixels = true;
    this.visible = false;
  }

  public init(data?: AsteroidSpawnData) {
    const spawnData = data ?? ASTEROID_INITIAL_SPAWN;

    this.position.set(spawnData.location.x, spawnData.location.y);
    this.velocity = { ...spawnData.velocity };
    this.hasEnteredBounds = false;
    this.applyTexture(spawnData.size);
    this.visible = true;
    this.isActive = true;
  }

  public update(deltaTime: number) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }

  public isOutsideBounds(width: number, height: number, margin: number) {
    const isInsideBounds =
      this.position.x >= 0 &&
      this.position.x <= width &&
      this.position.y >= 0 &&
      this.position.y <= height;

    if (isInsideBounds) {
      this.hasEnteredBounds = true;
    }

    if (!this.hasEnteredBounds) {
      return false;
    }

    return (
      this.position.x < -margin ||
      this.position.x > width + margin ||
      this.position.y < -margin ||
      this.position.y > height + margin
    );
  }

  public reset() {
    this.removeFromParent();
    this.position.set(
      ASTEROID_INITIAL_SPAWN.location.x,
      ASTEROID_INITIAL_SPAWN.location.y
    );
    this.velocity = { x: 0, y: 0 };
    this.hasEnteredBounds = false;
    this.visible = false;
    this.isActive = false;
  }

  private applyTexture(size: AsteroidSize) {
    const radius = ASTEROID_RADIUS_BY_SIZE[size];
    const textures = getLoadedAsteroidTextures()[size];

    this.texture = textures[randomInteger(textures.length)];
    this.width = radius * 2;
    this.height = radius * 2;
  }
}
