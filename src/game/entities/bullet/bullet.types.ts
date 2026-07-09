export type BulletLocation = {
  x: number;
  y: number;
  rotation: number;
};

export type BulletSpawnData = {
  location: BulletLocation;
  speed: number;
};
