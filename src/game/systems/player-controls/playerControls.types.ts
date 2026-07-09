export type PlayerControls = {
  fire: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
};

export type PlayerControlCounts = Record<keyof PlayerControls, number>;
