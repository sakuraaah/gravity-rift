import { Container, Graphics } from 'pixi.js';

import {
  BULLET_COLOR,
  BULLET_INITIAL_LOCATION,
  BULLET_MOVEMENT_SPEED,
  BULLET_RADIUS,
} from './bullet.constants';
import type { BulletSpawnData } from './bullet.types';

let bulletViewId = 0;

export class Bullet extends Container {
  public isActive = false;

  public speed = 0;

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
    const speed = data?.speed ?? BULLET_MOVEMENT_SPEED;

    this.position.set(location.x, location.y);
    this.rotation = location.rotation;
    this.speed = speed;
    this.visible = true;
    this.isActive = true;
  }

  public update(deltaTime: number) {
    this.position.x += Math.sin(this.rotation) * this.speed * deltaTime;
    this.position.y -= Math.cos(this.rotation) * this.speed * deltaTime;
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
    this.speed = 0;
    this.visible = false;
    this.isActive = false;
  }
}
