import { System } from 'check2d';

import type {
  ColliderTransform,
  CollisionPair,
  CollisionParticipant,
  GameBody,
} from './collision.types';

export class CollisionWorld {
  private readonly system = new System<GameBody>();

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

  public checkAll(): CollisionPair[] {
    const collisions: CollisionPair[] = [];
    const collisionKeys = new Set<string>();

    this.system.checkAll((response) => {
      const a: CollisionParticipant | undefined = response.a.userData;
      const b: CollisionParticipant | undefined = response.b.userData;

      if (!a || !b) {
        return;
      }

      const collisionKey = JSON.stringify([a.id, b.id].sort());

      if (collisionKeys.has(collisionKey)) {
        return;
      }

      collisionKeys.add(collisionKey);
      collisions.push({ a, b });
    });

    return collisions;
  }
}
