import { System } from 'check2d';

import { CollisionPhase } from './collision.enums';
import type {
  ColliderTransform,
  CollisionEvent,
  CollisionPair,
  CollisionParticipant,
  GameBody,
} from './collision.types';

export class CollisionWorld {
  private readonly system = new System<GameBody>();

  private activeCollisions = new Map<string, CollisionPair>();

  public register<TBody extends GameBody>(
    body: TBody,
    participant: CollisionParticipant
  ): TBody {
    body.userData = participant;

    this.system.insert(body);

    return body;
  }

  public unregister(body: GameBody): void {
    this.system.remove(body);
  }

  public sync(body: GameBody, transform: ColliderTransform): void {
    const positionChanged = body.x !== transform.x || body.y !== transform.y;
    const angleChanged =
      transform.angle !== undefined && body.angle !== transform.angle;

    if (!positionChanged && !angleChanged && !body.dirty) {
      return;
    }

    if (positionChanged) {
      body.setPosition(transform.x, transform.y, false);
    }

    if (transform.angle !== undefined && angleChanged) {
      body.setAngle(transform.angle, false);
    }

    body.updateBody();
  }

  public checkAll(): CollisionEvent[] {
    const currentCollisions = new Map<string, CollisionPair>();

    this.system.checkAll((response) => {
      const a: CollisionParticipant | undefined = response.a.userData;
      const b: CollisionParticipant | undefined = response.b.userData;

      if (!a || !b) {
        return;
      }

      const collisionKey = JSON.stringify([a.id, b.id].sort());

      if (!currentCollisions.has(collisionKey)) {
        currentCollisions.set(collisionKey, { a, b });
      }
    });

    const collisionEvents: CollisionEvent[] = [];

    currentCollisions.forEach((collision, collisionKey) => {
      collisionEvents.push({
        ...collision,
        phase: this.activeCollisions.has(collisionKey)
          ? CollisionPhase.Stay
          : CollisionPhase.Enter,
      });
    });

    this.activeCollisions.forEach((collision, collisionKey) => {
      if (!currentCollisions.has(collisionKey)) {
        collisionEvents.push({
          ...collision,
          phase: CollisionPhase.Exit,
        });
      }
    });

    this.activeCollisions = currentCollisions;

    return collisionEvents;
  }
}
