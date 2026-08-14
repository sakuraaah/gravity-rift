import {
  BlackHoleAnimation,
  BlackHolePhase,
} from '@/game/entities/black-hole/blackHole.enums';

import { BlackHoleTransitionProbabilityRule } from './blackHoleLifecycle.enums';
import type {
  BlackHoleDurationConfig,
  BlackHoleGrowthConfig,
  BlackHolePhaseTransitionConfig,
  BlackHoleTransitionAnimationConfig,
} from './blackHoleLifecycle.types';

const FIXED_DURATION_JITTER_RATIO = 0;
const CORE_PHASE_MEAN_DURATION_MS = 7000;
const CORE_PHASE_DURATION_JITTER_MS = 1000;
const CORE_PHASE_DURATION_JITTER_RATIO =
  CORE_PHASE_DURATION_JITTER_MS / CORE_PHASE_MEAN_DURATION_MS;

export const BLACK_HOLE_GROWTH_CONFIG = {
  chanceDecayRatio: 0.75,
  initialChance: 0.8,
} as const satisfies BlackHoleGrowthConfig;

export const BLACK_HOLE_PHASE_TRANSITION_CONFIG: BlackHolePhaseTransitionConfig =
  {
    [BlackHolePhase.Spawn]: {
      [BlackHolePhase.Idle]: BlackHoleTransitionProbabilityRule.Always,
    },
    [BlackHolePhase.Idle]: {
      [BlackHolePhase.Active]: BlackHoleTransitionProbabilityRule.Growth,
      [BlackHolePhase.Collapse]: BlackHoleTransitionProbabilityRule.Decline,
    },
    [BlackHolePhase.Active]: {
      [BlackHolePhase.Idle]: BlackHoleTransitionProbabilityRule.Decline,
      [BlackHolePhase.Danger]: BlackHoleTransitionProbabilityRule.Growth,
    },
    [BlackHolePhase.Danger]: {
      [BlackHolePhase.Active]: BlackHoleTransitionProbabilityRule.Always,
    },
    [BlackHolePhase.Collapse]: {},
  };

export const BLACK_HOLE_TRANSITION_ANIMATION_CONFIG: BlackHoleTransitionAnimationConfig =
  {
    [BlackHolePhase.Spawn]: {
      [BlackHolePhase.Idle]: [
        BlackHoleAnimation.SpawnToIdleA,
        BlackHoleAnimation.SpawnToIdleB,
        BlackHoleAnimation.Idle,
      ],
    },
    [BlackHolePhase.Idle]: {
      [BlackHolePhase.Active]: [
        BlackHoleAnimation.IdleToActiveA,
        BlackHoleAnimation.IdleToActiveB,
        BlackHoleAnimation.Active,
      ],
      [BlackHolePhase.Collapse]: [
        BlackHoleAnimation.IdleToCollapseA,
        BlackHoleAnimation.IdleToCollapseB,
        BlackHoleAnimation.Collapse,
      ],
    },
    [BlackHolePhase.Active]: {
      [BlackHolePhase.Idle]: [
        BlackHoleAnimation.IdleToActiveB,
        BlackHoleAnimation.IdleToActiveA,
        BlackHoleAnimation.Idle,
      ],
      [BlackHolePhase.Danger]: [
        BlackHoleAnimation.ActiveToDangerA,
        BlackHoleAnimation.ActiveToDangerB,
        BlackHoleAnimation.Danger,
      ],
    },
    [BlackHolePhase.Danger]: {
      [BlackHolePhase.Active]: [
        BlackHoleAnimation.ActiveToDangerB,
        BlackHoleAnimation.ActiveToDangerA,
        BlackHoleAnimation.Active,
      ],
    },
    [BlackHolePhase.Collapse]: {},
  };

export const BLACK_HOLE_DURATION_CONFIG_BY_ANIMATION = {
  [BlackHoleAnimation.Spawn]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 2000,
  },
  [BlackHoleAnimation.SpawnToIdleA]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 800,
  },
  [BlackHoleAnimation.SpawnToIdleB]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 800,
  },
  [BlackHoleAnimation.Idle]: {
    durationJitterRatio: CORE_PHASE_DURATION_JITTER_RATIO,
    meanDurationMs: CORE_PHASE_MEAN_DURATION_MS,
  },
  [BlackHoleAnimation.IdleToActiveA]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 1200,
  },
  [BlackHoleAnimation.IdleToActiveB]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 1200,
  },
  [BlackHoleAnimation.Active]: {
    durationJitterRatio: CORE_PHASE_DURATION_JITTER_RATIO,
    meanDurationMs: CORE_PHASE_MEAN_DURATION_MS,
  },
  [BlackHoleAnimation.ActiveToDangerA]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 1200,
  },
  [BlackHoleAnimation.ActiveToDangerB]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 1200,
  },
  [BlackHoleAnimation.Danger]: {
    durationJitterRatio: CORE_PHASE_DURATION_JITTER_RATIO,
    meanDurationMs: CORE_PHASE_MEAN_DURATION_MS,
  },
  [BlackHoleAnimation.IdleToCollapseA]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 800,
  },
  [BlackHoleAnimation.IdleToCollapseB]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 800,
  },
  [BlackHoleAnimation.Collapse]: {
    durationJitterRatio: FIXED_DURATION_JITTER_RATIO,
    meanDurationMs: 2000,
  },
} as const satisfies Record<BlackHoleAnimation, BlackHoleDurationConfig>;
