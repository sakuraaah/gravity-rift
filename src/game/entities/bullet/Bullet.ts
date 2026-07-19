import { Container, Graphics } from 'pixi.js';

import { Circle } from 'check2d';

import { CollisionKind } from '@/game/systems';
import type {
  CollisionParticipant,
  CollisionWorld,
  Consumable,
  ProjectileDamageSource,
} from '@/game/systems';
import type { Vector2 } from '@/game/utils';
import { DEFAULT_BULLET_DAMAGE } from '@/store';

import {
  BULLET_COLOR,
  BULLET_HITBOX_RADIUS,
  BULLET_INITIAL_LOCATION,
  BULLET_RADIUS,
} from './bullet.constants';
import type { BulletSpawnData } from './bullet.types';

let bulletViewId = 0;

export class Bullet
  extends Container
  implements Consumable, ProjectileDamageSource
{
  public damage = DEFAULT_BULLET_DAMAGE;

  public isActive = false;

  private readonly collider: Circle<CollisionParticipant>;

  private velocity: Vector2 = { x: 0, y: 0 };

  public constructor() {
    super();

    this.label = `bullet-${bulletViewId}`;
    bulletViewId += 1;
    this.visible = false;

    this.collider = new Circle<CollisionParticipant>(
      BULLET_INITIAL_LOCATION,
      BULLET_HITBOX_RADIUS
    );

    const graphics = new Graphics();

    graphics.setFillStyle({ color: BULLET_COLOR });
    graphics.circle(0, 0, BULLET_RADIUS);
    graphics.fill();

    this.addChild(graphics);
  }

  public init(data?: BulletSpawnData) {
    const location = data?.location ?? BULLET_INITIAL_LOCATION;
    const velocity = data?.velocity ?? { x: 0, y: 0 };

    this.damage = data?.damage ?? DEFAULT_BULLET_DAMAGE;
    this.position.set(location.x, location.y);
    this.rotation = location.rotation;
    this.velocity = { ...velocity };
    this.visible = true;
    this.isActive = true;
  }

  public update(deltaTime: number, speedMultiplier: number) {
    this.position.set(
      this.position.x + this.velocity.x * deltaTime * speedMultiplier,
      this.position.y + this.velocity.y * deltaTime * speedMultiplier
    );
  }

  public consume(): boolean {
    if (!this.isActive) {
      return false;
    }

    this.isActive = false;
    this.visible = false;

    return true;
  }

  public registerCollider(collisionWorld: CollisionWorld) {
    collisionWorld.register(this.collider, {
      actor: this,
      id: this.label,
      kind: CollisionKind.Bullet,
    });

    this.syncCollider(collisionWorld);
  }

  public syncCollider(collisionWorld: CollisionWorld) {
    collisionWorld.sync(this.collider, {
      x: this.position.x,
      y: this.position.y,
    });
  }

  public unregisterCollider(collisionWorld: CollisionWorld) {
    collisionWorld.unregister(this.collider);
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
    this.damage = DEFAULT_BULLET_DAMAGE;
    this.velocity = { x: 0, y: 0 };
    this.visible = false;
    this.isActive = false;
  }
}
