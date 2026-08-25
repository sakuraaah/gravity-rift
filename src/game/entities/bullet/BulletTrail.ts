import { MeshRope, Point } from 'pixi.js';
import type { PointData } from 'pixi.js';

import { getLoadedBulletTextures } from '@/game/assets';

import {
  BULLET_COLOR,
  BULLET_INITIAL_LOCATION,
  BULLET_TRAIL_FADE_DURATION_MS,
  BULLET_TRAIL_POINT_COUNT,
  BULLET_TRAIL_POINT_SPACING,
  BULLET_TRAIL_WIDTH,
} from './bullet.constants';

let bulletTrailViewId = 0;

export class BulletTrail extends MeshRope {
  private readonly trailPoints: Point[];

  private readonly previousPosition = new Point();

  private distanceSinceLastSample = 0;

  private fadeActiveUntilGameTimeMs: number | null = null;

  public constructor() {
    const trailPoints = Array.from(
      { length: BULLET_TRAIL_POINT_COUNT },
      () => new Point(BULLET_INITIAL_LOCATION.x, BULLET_INITIAL_LOCATION.y)
    );

    super({
      points: trailPoints,
      texture: getLoadedBulletTextures().trail,
      textureScale: 0,
      width: BULLET_TRAIL_WIDTH,
    });

    this.trailPoints = trailPoints;
    this.label = `bullet-trail-${bulletTrailViewId}`;
    bulletTrailViewId += 1;
    this.eventMode = 'none';
    this.roundPixels = true;
    this.tint = BULLET_COLOR;
    this.visible = false;
  }

  public init(position?: PointData) {
    const initialPosition = position ?? BULLET_INITIAL_LOCATION;

    this.trailPoints.forEach((point) => {
      point.copyFrom(initialPosition);
    });

    this.previousPosition.copyFrom(initialPosition);
    this.distanceSinceLastSample = 0;
    this.fadeActiveUntilGameTimeMs = null;
    this.alpha = 1;
    this.visible = true;
  }

  public recordPosition(position: PointData) {
    const deltaX = position.x - this.previousPosition.x;
    const deltaY = position.y - this.previousPosition.y;
    let remainingDistance = Math.hypot(deltaX, deltaY);

    if (remainingDistance === 0) {
      return;
    }

    const directionX = deltaX / remainingDistance;
    const directionY = deltaY / remainingDistance;
    let sampleX = this.previousPosition.x;
    let sampleY = this.previousPosition.y;

    while (
      this.distanceSinceLastSample + remainingDistance >=
      BULLET_TRAIL_POINT_SPACING
    ) {
      const distanceToNextSample =
        BULLET_TRAIL_POINT_SPACING - this.distanceSinceLastSample;

      sampleX += directionX * distanceToNextSample;
      sampleY += directionY * distanceToNextSample;
      remainingDistance -= distanceToNextSample;
      this.pushSample(sampleX, sampleY);
      this.distanceSinceLastSample = 0;
    }

    this.distanceSinceLastSample += remainingDistance;
    this.previousPosition.copyFrom(position);
    this.trailPoints[0].copyFrom(position);
  }

  private pushSample(x: number, y: number) {
    for (let index = this.trailPoints.length - 1; index > 1; index -= 1) {
      this.trailPoints[index].copyFrom(this.trailPoints[index - 1]);
    }

    this.trailPoints[1].set(x, y);
  }

  public startFade(gameTimeMs: number) {
    this.fadeActiveUntilGameTimeMs = gameTimeMs + BULLET_TRAIL_FADE_DURATION_MS;
  }

  public updateFade(gameTimeMs: number) {
    const fadeActiveUntilGameTimeMs = this.fadeActiveUntilGameTimeMs;

    if (fadeActiveUntilGameTimeMs === null) {
      return false;
    }

    const remainingFadeMs = Math.max(0, fadeActiveUntilGameTimeMs - gameTimeMs);

    this.alpha = remainingFadeMs / BULLET_TRAIL_FADE_DURATION_MS;

    return remainingFadeMs === 0;
  }

  public reset() {
    this.removeFromParent();
    this.fadeActiveUntilGameTimeMs = null;
    this.alpha = 1;
    this.visible = false;
  }
}
