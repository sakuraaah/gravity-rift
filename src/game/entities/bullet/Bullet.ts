import { Sprite } from 'pixi.js';

import { Circle } from 'check2d';

import { getLoadedBulletTextures } from '@/game/assets';
import { GAME_SCALE } from '@/game/constants';
import { CollisionKind } from '@/game/systems';
import type {
  CollisionParticipant,
  CollisionWorld,
  Consumable,
  PositionedEntity,
  ProjectileDamageSource,
} from '@/game/systems';
import type { Vector2 } from '@/game/utils';
import { DEFAULT_BULLET_DAMAGE } from '@/store';

import {
  BULLET_HITBOX_RADIUS,
  BULLET_INITIAL_LOCATION,
} from './bullet.constants';
import type { BulletSpawnData } from './bullet.types';

let bulletViewId = 0;

export class Bullet
  extends Sprite
  implements Consumable, PositionedEntity, ProjectileDamageSource
{
  public damage = DEFAULT_BULLET_DAMAGE;

  public isActive = false;

  private readonly collider: Circle<CollisionParticipant>;

  private entityId: string | null = null;

  private velocity: Vector2 = { x: 0, y: 0 };

  public constructor() {
    super(getLoadedBulletTextures().bullet);

    this.label = `bullet-${bulletViewId}`;
    bulletViewId += 1;
    this.anchor.set(0.5);
    this.eventMode = 'none';
    this.roundPixels = true;
    this.visible = false;

    this.collider = new Circle<CollisionParticipant>(
      BULLET_INITIAL_LOCATION,
      BULLET_HITBOX_RADIUS
    );
  }

  public init(data?: BulletSpawnData) {
    const location = data?.location ?? BULLET_INITIAL_LOCATION;
    const velocity = data?.velocity ?? { x: 0, y: 0 };

    this.damage = data?.damage ?? DEFAULT_BULLET_DAMAGE;
    this.entityId = crypto.randomUUID();
    this.position.set(location.x, location.y);
    this.scale.set(GAME_SCALE);
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

  public applyGravity(acceleration: Readonly<Vector2>, deltaTime: number) {
    this.velocity.x += acceleration.x * deltaTime;
    this.velocity.y += acceleration.y * deltaTime;
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
    if (this.entityId === null) {
      throw new Error(
        'Cannot register a bullet collider before initialization'
      );
    }

    collisionWorld.register(this.collider, {
      actor: this,
      id: this.entityId,
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
    this.scale.set(1);
    this.damage = DEFAULT_BULLET_DAMAGE;
    this.entityId = null;
    this.velocity = { x: 0, y: 0 };
    this.visible = false;
    this.isActive = false;
  }
}
