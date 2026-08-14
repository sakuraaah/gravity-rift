export const BlackHoleTransitionProbabilityRule = {
  Always: 'always',
  Growth: 'growth',
  Decline: 'decline',
} as const;

export type BlackHoleTransitionProbabilityRule =
  (typeof BlackHoleTransitionProbabilityRule)[keyof typeof BlackHoleTransitionProbabilityRule];
