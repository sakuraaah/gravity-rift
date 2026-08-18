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
  Flashable,
  PositionedEntity,
  SizedEntity,
} from '@/game/systems';
import { randomInteger } from '@/game/utils';
import type { Vector2 } from '@/game/utils';

import {
  ASTEROID_CONTACT_DAMAGE_BY_SIZE,
  ASTEROID_HITBOX_RADIUS_BY_SIZE,
  ASTEROID_HIT_FLASH_DURATION_MS,
  ASTEROID_HIT_FLASH_FILTERS,
  ASTEROID_INITIAL_SPAWN,
  ASTEROID_MAX_HP_BY_SIZE,
} from './asteroid.constants';
import type { AsteroidSize } from './asteroid.enums';
import type { AsteroidSpawnData } from './asteroid.types';

let asteroidViewId = 0;

export class Asteroid
  extends Sprite
  implements
    Flashable,
    Damageable,
    ContactDamageSource,
    PositionedEntity,
    SizedEntity<AsteroidSize>
{
  public contactDamage: number =
    ASTEROID_CONTACT_DAMAGE_BY_SIZE[ASTEROID_INITIAL_SPAWN.size];

  public isActive = false;

  private readonly collider: Circle<CollisionParticipant>;

  private entityId: string | null = null;

  private hasEnteredBounds = false;

  private hitFlashTimeoutId: number | null = null;

  private hp: number = ASTEROID_MAX_HP_BY_SIZE[ASTEROID_INITIAL_SPAWN.size];

  private asteroidSize: AsteroidSize = ASTEROID_INITIAL_SPAWN.size;

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
    this.syncColliderSize();
  }

  public get size(): AsteroidSize {
    return this.asteroidSize;
  }

  public init(data?: AsteroidSpawnData) {
    const spawnData = data ?? ASTEROID_INITIAL_SPAWN;

    this.position.set(spawnData.location.x, spawnData.location.y);
    this.asteroidSize = spawnData.size;
    this.contactDamage = ASTEROID_CONTACT_DAMAGE_BY_SIZE[this.asteroidSize];
    this.entityId = crypto.randomUUID();
    this.hp = ASTEROID_MAX_HP_BY_SIZE[this.asteroidSize];
    this.velocity = { ...spawnData.velocity };
    this.hasEnteredBounds = false;
    this.syncColliderSize();
    this.applyTexture();
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

  public flash() {
    if (!this.isActive) {
      return;
    }

    if (this.hitFlashTimeoutId !== null) {
      window.clearTimeout(this.hitFlashTimeoutId);
    }

    this.filters = ASTEROID_HIT_FLASH_FILTERS;
    this.hitFlashTimeoutId = window.setTimeout(() => {
      this.filters = null;
      this.hitFlashTimeoutId = null;
    }, ASTEROID_HIT_FLASH_DURATION_MS);
  }

  public registerCollider(collisionWorld: CollisionWorld) {
    if (this.entityId === null) {
      throw new Error(
        'Cannot register an asteroid collider before initialization'
      );
    }

    collisionWorld.register(this.collider, {
      actor: this,
      id: this.entityId,
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
    if (this.hitFlashTimeoutId !== null) {
      window.clearTimeout(this.hitFlashTimeoutId);
      this.hitFlashTimeoutId = null;
    }

    this.filters = null;
    this.removeFromParent();
    this.position.set(
      ASTEROID_INITIAL_SPAWN.location.x,
      ASTEROID_INITIAL_SPAWN.location.y
    );
    this.velocity = { x: 0, y: 0 };
    this.asteroidSize = ASTEROID_INITIAL_SPAWN.size;
    this.contactDamage = ASTEROID_CONTACT_DAMAGE_BY_SIZE[this.asteroidSize];
    this.entityId = null;
    this.hp = ASTEROID_MAX_HP_BY_SIZE[this.asteroidSize];
    this.hasEnteredBounds = false;
    this.syncColliderSize();
    this.visible = false;
    this.isActive = false;
  }

  private applyTexture() {
    const textures = getLoadedAsteroidTextures()[this.asteroidSize];

    this.texture = textures[randomInteger(textures.length)];
    this.scale.set(GAME_SCALE);
  }

  private syncColliderSize() {
    this.collider.setScale(ASTEROID_HITBOX_RADIUS_BY_SIZE[this.asteroidSize]);
  }
}
