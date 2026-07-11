import { Container, Graphics } from 'pixi.js';

import type { Vector2 } from '@/game/utils';

import {
  ASTEROID_COLORS,
  ASTEROID_INITIAL_SPAWN,
  ASTEROID_RADIUS_BY_SIZE,
} from './asteroid.constants';
import type { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

let asteroidViewId = 0;

export class Asteroid extends Container {
  public isActive = false;

  private hasEnteredBounds = false;

  private velocity: Vector2 = { x: 0, y: 0 };

  private readonly graphics = new Graphics();

  public constructor() {
    super();

    this.label = `asteroid-${asteroidViewId}`;
    asteroidViewId += 1;
    this.visible = false;

    this.addChild(this.graphics);
  }

  public init(data?: AsteroidSpawnData) {
    const spawnData = data ?? ASTEROID_INITIAL_SPAWN;

    this.position.set(spawnData.location.x, spawnData.location.y);
    this.velocity = { ...spawnData.velocity };
    this.hasEnteredBounds = false;
    this.draw(spawnData.size);
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

  private draw(size: AsteroidSize) {
    const radius = ASTEROID_RADIUS_BY_SIZE[size];
    const shadowRadius = radius * 0.86;
    const highlightRadius = Math.max(1, radius * 0.18);
    const pitRadius = Math.max(1, radius * 0.12);

    this.graphics.clear();
    this.graphics.setFillStyle({ color: ASTEROID_COLORS.Dark });
    this.graphics.circle(radius * 0.12, radius * 0.14, radius);
    this.graphics.fill();
    this.graphics.setFillStyle({ color: ASTEROID_COLORS.Body });
    this.graphics.circle(0, 0, radius);
    this.graphics.fill();
    this.graphics.setFillStyle({ color: ASTEROID_COLORS.Shade });
    this.graphics.circle(radius * 0.18, radius * 0.2, shadowRadius);
    this.graphics.fill();
    this.graphics.setFillStyle({ color: ASTEROID_COLORS.Body });
    this.graphics.circle(-radius * 0.1, -radius * 0.08, radius * 0.88);
    this.graphics.fill();
    this.graphics.setFillStyle({ color: ASTEROID_COLORS.Light });
    this.graphics.circle(-radius * 0.38, -radius * 0.34, highlightRadius);
    this.graphics.circle(radius * 0.08, -radius * 0.46, highlightRadius * 0.7);
    this.graphics.fill();
    this.graphics.setFillStyle({ color: ASTEROID_COLORS.Dark });
    this.graphics.circle(radius * 0.28, radius * 0.12, pitRadius);
    this.graphics.circle(-radius * 0.2, radius * 0.32, pitRadius * 0.75);
    this.graphics.fill();
  }
}
