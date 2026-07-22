import { DIRECTIONAL_FRAME_SUFFIXES } from '@/game/assets/constants';
import type {
  DirectionalAnimationFrames,
  DirectionalTextures,
} from '@/game/assets/types';
import {
  getSpritesheetAnimation,
  getSpritesheetTexture,
  loadSpritesheet,
} from '@/game/assets/utils';

const SPACESHIP_HULL_ATLAS_URL = '/assets/sprites/spaceship-hull.atlas.json';
const SPACESHIP_FLAME_ATLAS_URL = '/assets/sprites/spaceship-flame.atlas.json';
const SPACESHIP_PARTICLES_ATLAS_URL =
  '/assets/sprites/spaceship-particles.atlas.json';

export interface SpaceshipTextures {
  flame: DirectionalAnimationFrames;
  hull: DirectionalTextures;
  particles: DirectionalAnimationFrames;
}

let spaceshipTextures: SpaceshipTextures | null = null;
let spaceshipTexturesLoadPromise: Promise<SpaceshipTextures> | null = null;

async function loadTextures() {
  const [hullSpritesheet, flameSpritesheet, particlesSpritesheet] =
    await Promise.all([
      loadSpritesheet(SPACESHIP_HULL_ATLAS_URL),
      loadSpritesheet(SPACESHIP_FLAME_ATLAS_URL),
      loadSpritesheet(SPACESHIP_PARTICLES_ATLAS_URL),
    ]);

  return {
    flame: DIRECTIONAL_FRAME_SUFFIXES.map((direction) =>
      getSpritesheetAnimation(flameSpritesheet, `engine_flame_deg_${direction}`)
    ),
    hull: DIRECTIONAL_FRAME_SUFFIXES.map((direction) =>
      getSpritesheetTexture(hullSpritesheet, `ship_rot_deg_${direction}`)
    ),
    particles: DIRECTIONAL_FRAME_SUFFIXES.map((direction) =>
      getSpritesheetAnimation(
        particlesSpritesheet,
        `engine_particles_deg_${direction}`
      )
    ),
  };
}

export function loadSpaceshipAssets() {
  if (spaceshipTextures) {
    return Promise.resolve(spaceshipTextures);
  }

  if (!spaceshipTexturesLoadPromise) {
    spaceshipTexturesLoadPromise = loadTextures()
      .then((textures) => {
        spaceshipTextures = textures;
        return textures;
      })
      .catch((error: unknown) => {
        spaceshipTexturesLoadPromise = null;
        throw error;
      });
  }

  return spaceshipTexturesLoadPromise;
}

export function getLoadedSpaceshipTextures() {
  if (!spaceshipTextures) {
    throw new Error(
      'Spaceship assets must be loaded before rendering the game.'
    );
  }

  return spaceshipTextures;
}
