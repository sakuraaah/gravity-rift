import type {
  BlackHoleAnimation,
  BlackHolePhase,
} from '@/game/entities/black-hole/blackHole.enums';

import type { BlackHoleTransitionProbabilityRule } from './blackHoleLifecycle.enums';

export type BlackHoleDurationConfig = {
  durationJitterRatio: number;
  meanDurationMs: number;
};

export type BlackHoleGrowthConfig = {
  chanceDecayRatio: number;
  initialChance: number;
};

export type BlackHoleTransitionSelection = {
  nextPhase: BlackHolePhase;
  probabilityRule: BlackHoleTransitionProbabilityRule;
};

type BlackHoleTransitionsByTargetPhase = Readonly<
  Partial<Record<BlackHolePhase, BlackHoleTransitionProbabilityRule>>
>;

export type BlackHolePhaseTransitionConfig = Readonly<
  Record<BlackHolePhase, BlackHoleTransitionsByTargetPhase>
>;

type BlackHoleTransitionAnimationsByTargetPhase = Readonly<
  Partial<Record<BlackHolePhase, readonly BlackHoleAnimation[]>>
>;

export type BlackHoleTransitionAnimationConfig = Readonly<
  Record<BlackHolePhase, BlackHoleTransitionAnimationsByTargetPhase>
>;
