import { Sprite, Texture } from 'pixi.js';

import { getLoadedAsteroidTextures } from '@/game/assets';
import { GAME_SCALE } from '@/game/constants';
import type { Vector2 } from '@/game/utils';
import { randomInteger } from '@/game/utils';
import { snapToGrid } from '@/shared/utils';

import { ASTEROID_INITIAL_SPAWN } from './asteroid.constants';
import type { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

let asteroidViewId = 0;

export class Asteroid extends Sprite {
  public isActive = false;

  private hasEnteredBounds = false;

  // Intermediate position that contains exact pixel values
  // (is used to determine nearest round pixel)
  private simulationPosition: Vector2 = { x: 0, y: 0 };

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

    this.simulationPosition = { ...spawnData.location };
    this.velocity = { ...spawnData.velocity };
    this.hasEnteredBounds = false;
    this.applyTexture(spawnData.size);
    this.syncRenderPosition();
    this.visible = true;
    this.isActive = true;
  }

  public update(deltaTime: number) {
    this.simulationPosition.x += this.velocity.x * deltaTime;
    this.simulationPosition.y += this.velocity.y * deltaTime;

    this.syncRenderPosition();
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
    this.simulationPosition = { ...ASTEROID_INITIAL_SPAWN.location };
    this.syncRenderPosition();
    this.velocity = { x: 0, y: 0 };
    this.hasEnteredBounds = false;
    this.visible = false;
    this.isActive = false;
  }

  private applyTexture(size: AsteroidSize) {
    const textures = getLoadedAsteroidTextures()[size];

    this.texture = textures[randomInteger(textures.length)];
    this.scale.set(GAME_SCALE);
  }

  private syncRenderPosition() {
    const renderX = snapToGrid(this.simulationPosition.x, GAME_SCALE);
    const renderY = snapToGrid(this.simulationPosition.y, GAME_SCALE);

    if (this.position.x !== renderX || this.position.y !== renderY) {
      this.position.set(renderX, renderY);
    }
  }
}
