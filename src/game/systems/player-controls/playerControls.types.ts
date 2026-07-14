export type PlayerActions = {
  fire: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
};

export type PlayerActionCounts = Record<keyof PlayerActions, number>;
