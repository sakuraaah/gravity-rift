import type { Texture } from 'pixi.js';

// array of textures where key is direction index
export type DirectionalTextures = Texture[];

// just an array of continuous textures (animation frames)
export type AnimationFrames = Texture[];

// array of animation frames where key is direction index
export type DirectionalAnimationFrames = AnimationFrames[];
