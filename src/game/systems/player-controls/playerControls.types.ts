export type PlayerActions = {
  fire: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
};

export type ActiveInputIdsByAction = Record<keyof PlayerActions, Set<string>>;

export type UsePlayerControlsOptions = {
  disabled: boolean;
};
