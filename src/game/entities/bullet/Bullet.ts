import { Container, Graphics } from 'pixi.js';

import type { Vector2 } from '@/game/utils';

import {
  BULLET_COLOR,
  BULLET_INITIAL_LOCATION,
  BULLET_RADIUS,
} from './bullet.constants';
import type { BulletSpawnData } from './bullet.types';

let bulletViewId = 0;

export class Bullet extends Container {
  public isActive = false;

  private velocity: Vector2 = { x: 0, y: 0 };

  public constructor() {
    super();

    this.label = `bullet-${bulletViewId}`;
    bulletViewId += 1;
    this.visible = false;

    const graphics = new Graphics();

    graphics.setFillStyle({ color: BULLET_COLOR });
    graphics.circle(0, 0, BULLET_RADIUS);
    graphics.fill();

    this.addChild(graphics);
  }

  public init(data?: BulletSpawnData) {
    const location = data?.location ?? BULLET_INITIAL_LOCATION;
    const velocity = data?.velocity ?? { x: 0, y: 0 };

    this.position.set(location.x, location.y);
    this.rotation = location.rotation;
    this.velocity = { ...velocity };
    this.visible = true;
    this.isActive = true;
  }

  public update(deltaTime: number) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }

  public isOutsideBounds(width: number, height: number, margin: number) {
    return (
      this.position.x < -margin ||
      this.position.x > width + margin ||
      this.position.y < -margin ||
      this.position.y > height + margin
    );
  }

  public reset() {
    this.removeFromParent();
    this.position.set(BULLET_INITIAL_LOCATION.x, BULLET_INITIAL_LOCATION.y);
    this.rotation = BULLET_INITIAL_LOCATION.rotation;
    this.velocity = { x: 0, y: 0 };
    this.visible = false;
    this.isActive = false;
  }
}
