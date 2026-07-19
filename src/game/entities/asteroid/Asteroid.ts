import { Sprite, Texture } from 'pixi.js';

import { Circle } from 'check2d';

import { getLoadedAsteroidTextures } from '@/game/assets';
import { GAME_SCALE } from '@/game/constants';
import { CollisionKind, applyDamage } from '@/game/systems';
import type {
  CollisionParticipant,
  CollisionWorld,
  ContactDamageSource,
  DamageResult,
  Damageable,
} from '@/game/systems';
import type { Vector2 } from '@/game/utils';
import { randomInteger } from '@/game/utils';

import {
  ASTEROID_CONTACT_DAMAGE_BY_SIZE,
  ASTEROID_HITBOX_RADIUS_BY_SIZE,
  ASTEROID_INITIAL_SPAWN,
  ASTEROID_MAX_HP_BY_SIZE,
} from './asteroid.constants';
import type { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

let asteroidViewId = 0;

export class Asteroid
  extends Sprite
  implements Damageable, ContactDamageSource
{
  public contactDamage =
    ASTEROID_CONTACT_DAMAGE_BY_SIZE[ASTEROID_INITIAL_SPAWN.size];

  public isActive = false;

  private readonly collider: Circle<CollisionParticipant>;

  private colliderSize: AsteroidSize | null = null;

  private hasEnteredBounds = false;

  private hp = ASTEROID_MAX_HP_BY_SIZE[ASTEROID_INITIAL_SPAWN.size];

  private velocity: Vector2 = { x: 0, y: 0 };

  public constructor() {
    super(Texture.EMPTY);

    this.label = `asteroid-${asteroidViewId}`;
    asteroidViewId += 1;
    this.anchor.set(0.5);
    this.roundPixels = true;
    this.visible = false;

    // The collider uses a unit radius. Its scale becomes the hitbox radius for
    // the active asteroid size when the pooled object is initialized.
    this.collider = new Circle<CollisionParticipant>(
      ASTEROID_INITIAL_SPAWN.location,
      1
    );
  }

  public init(data?: AsteroidSpawnData) {
    const spawnData = data ?? ASTEROID_INITIAL_SPAWN;

    this.position.set(spawnData.location.x, spawnData.location.y);
    this.contactDamage = ASTEROID_CONTACT_DAMAGE_BY_SIZE[spawnData.size];
    this.hp = ASTEROID_MAX_HP_BY_SIZE[spawnData.size];
    this.velocity = { ...spawnData.velocity };
    this.hasEnteredBounds = false;
    this.syncColliderSize(spawnData.size);
    this.applyTexture(spawnData.size);
    this.visible = true;
    this.isActive = true;
  }

  public update(deltaTime: number, speedMultiplier: number) {
    this.position.set(
      this.position.x + this.velocity.x * deltaTime * speedMultiplier,
      this.position.y + this.velocity.y * deltaTime * speedMultiplier
    );
  }

  public takeDamage(damage: number): DamageResult | null {
    if (!this.isActive) {
      return null;
    }

    const result = applyDamage(this.hp, damage);

    this.hp = result.remainingHp;

    if (result.destroyed) {
      this.isActive = false;
      this.visible = false;
    }

    return result;
  }

  public registerCollider(collisionWorld: CollisionWorld) {
    collisionWorld.register(this.collider, {
      actor: this,
      id: this.label,
      kind: CollisionKind.Asteroid,
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
    this.contactDamage =
      ASTEROID_CONTACT_DAMAGE_BY_SIZE[ASTEROID_INITIAL_SPAWN.size];
    this.hp = ASTEROID_MAX_HP_BY_SIZE[ASTEROID_INITIAL_SPAWN.size];
    this.hasEnteredBounds = false;
    this.visible = false;
    this.isActive = false;
  }

  private applyTexture(size: AsteroidSize) {
    const textures = getLoadedAsteroidTextures()[size];

    this.texture = textures[randomInteger(textures.length)];
    this.scale.set(GAME_SCALE);
  }

  private syncColliderSize(size: AsteroidSize) {
    if (this.colliderSize === size) {
      return;
    }

    this.collider.setScale(ASTEROID_HITBOX_RADIUS_BY_SIZE[size]);
    this.colliderSize = size;
  }
}
