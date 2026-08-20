import { useAppStore } from '@/store';

import {
  BASE_WAVE_SCORE_STEP,
  GAME_SPEED_MULTIPLIER_STEP,
  GAME_SPEED_RAMP_WAVE_COUNT,
  INITIAL_GAME_SPEED_MULTIPLIER,
  INITIAL_WAVE,
  MAX_GAME_SPEED_MULTIPLIER,
  MAX_WAVE_SCORE_STEP,
  WAVE_SCORE_STEP_GROWTH,
} from './scoring.constants';

function normalizeWave(wave: number) {
  if (!Number.isFinite(wave)) {
    return INITIAL_WAVE;
  }

  return Math.max(INITIAL_WAVE, Math.floor(wave));
}

export function getGameSpeedMultiplierForWave(wave: number) {
  const normalizedWave = normalizeWave(wave);
  const multiplier =
    INITIAL_GAME_SPEED_MULTIPLIER +
    (normalizedWave - INITIAL_WAVE) * GAME_SPEED_MULTIPLIER_STEP;

  return Math.min(MAX_GAME_SPEED_MULTIPLIER, Number(multiplier.toFixed(10)));
}

export function getScoreStepForWave(wave: number) {
  const speedMultiplier = getGameSpeedMultiplierForWave(wave);

  return Math.round(
    BASE_WAVE_SCORE_STEP * (speedMultiplier / INITIAL_GAME_SPEED_MULTIPLIER)
  );
}

export function getScoreThresholdForWave(wave: number) {
  const waveOffset = normalizeWave(wave) - INITIAL_WAVE;
  const rampWaveCount = Math.min(waveOffset, GAME_SPEED_RAMP_WAVE_COUNT);
  const rampScoreThreshold =
    (rampWaveCount *
      (2 * BASE_WAVE_SCORE_STEP +
        (rampWaveCount - 1) * WAVE_SCORE_STEP_GROWTH)) /
    2;
  const maxSpeedWaveCount = waveOffset - rampWaveCount;

  return Math.round(
    rampScoreThreshold + maxSpeedWaveCount * MAX_WAVE_SCORE_STEP
  );
}

export function increaseScore(points: number) {
  if (!Number.isFinite(points) || points <= 0) {
    return;
  }

  const {
    addScore,
    gameSpeedMultiplier,
    increaseWave,
    score,
    setGameSpeedMultiplier,
    wave,
  } = useAppStore.getState();
  const newScore = score + points;

  if (!Number.isFinite(newScore)) {
    return;
  }

  addScore(points);

  let newWave = wave;

  while (newScore >= getScoreThresholdForWave(newWave + 1)) {
    increaseWave();
    newWave += 1;
  }

  const newGameSpeedMultiplier = getGameSpeedMultiplierForWave(newWave);

  if (newGameSpeedMultiplier !== gameSpeedMultiplier) {
    setGameSpeedMultiplier(newGameSpeedMultiplier);
  }
}
