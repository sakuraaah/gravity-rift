import { BlackHolePhase } from '@/game/entities/black-hole/blackHole.enums';
import type { BlackHoleAnimation } from '@/game/entities/black-hole/blackHole.enums';
import { randomBetween, randomCenteredBias } from '@/game/utils';

import {
  BLACK_HOLE_DURATION_CONFIG_BY_ANIMATION,
  BLACK_HOLE_PHASE_TRANSITION_CONFIG,
  BLACK_HOLE_TRANSITION_ANIMATION_CONFIG,
} from './blackHoleLifecycle.constants';
import { BlackHoleTransitionProbabilityRule } from './blackHoleLifecycle.enums';
import type { BlackHoleTransitionSelection } from './blackHoleLifecycle.types';

type WeightedPhase = {
  phase: BlackHolePhase;
  probabilityRule: BlackHoleTransitionProbabilityRule;
  weight: number;
};

function getTransitionWeight(
  probabilityRule: BlackHoleTransitionProbabilityRule,
  growthChance: number
) {
  if (probabilityRule === BlackHoleTransitionProbabilityRule.Always) {
    return 1;
  }

  if (probabilityRule === BlackHoleTransitionProbabilityRule.Growth) {
    return growthChance;
  }

  if (probabilityRule === BlackHoleTransitionProbabilityRule.Decline) {
    return 1 - growthChance;
  }

  probabilityRule satisfies never;
  throw new Error('Unsupported black hole transition probability rule.');
}

function getWeightedNextPhases(
  currentPhase: BlackHolePhase,
  growthChance: number
): WeightedPhase[] {
  const transitions = BLACK_HOLE_PHASE_TRANSITION_CONFIG[currentPhase];
  const weightedPhases: WeightedPhase[] = [];

  for (const phase of Object.values(BlackHolePhase)) {
    const probabilityRule = transitions[phase];

    if (!probabilityRule) {
      continue;
    }

    weightedPhases.push({
      phase,
      probabilityRule,
      weight: getTransitionWeight(probabilityRule, growthChance),
    });
  }

  return weightedPhases;
}

export function selectNextBlackHoleTransition(
  currentPhase: BlackHolePhase,
  growthChance: number
): BlackHoleTransitionSelection | null {
  if (!Number.isFinite(growthChance) || growthChance < 0 || growthChance > 1) {
    throw new RangeError('Black hole growth chance must be between 0 and 1.');
  }

  const weightedPhases = getWeightedNextPhases(currentPhase, growthChance);
  const totalWeight = weightedPhases.reduce(
    (sum, { weight }) => sum + weight,
    0
  );

  if (totalWeight <= 0) {
    return null;
  }

  let roll = randomBetween(0, totalWeight);
  let fallbackSelection: BlackHoleTransitionSelection | null = null;

  for (const { phase, probabilityRule, weight } of weightedPhases) {
    if (weight <= 0) {
      continue;
    }

    fallbackSelection = {
      nextPhase: phase,
      probabilityRule,
    };

    if (roll < weight) {
      return fallbackSelection;
    }

    roll -= weight;
  }

  return fallbackSelection;
}

export function getBlackHoleTransitionAnimationSequence(
  currentPhase: BlackHolePhase,
  nextPhase: BlackHolePhase
): readonly BlackHoleAnimation[] {
  const transitions = BLACK_HOLE_TRANSITION_ANIMATION_CONFIG[currentPhase];
  const animations = transitions[nextPhase];

  if (!animations) {
    throw new Error(
      `Unsupported black hole phase transition: ${currentPhase} -> ${nextPhase}.`
    );
  }

  return animations;
}

export function sampleBlackHoleAnimationDurationMs(
  animation: BlackHoleAnimation
) {
  const config = BLACK_HOLE_DURATION_CONFIG_BY_ANIMATION[animation];

  if (config.durationJitterRatio === 0) {
    return config.meanDurationMs;
  }

  const jitterMs =
    config.meanDurationMs * config.durationJitterRatio * randomCenteredBias();

  return config.meanDurationMs + jitterMs;
}
