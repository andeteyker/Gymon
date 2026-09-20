import { ExerciseCatalogEntry } from "./exerciseCatalog";

export interface BalancedExerciseRewardInput {
  exercise: ExerciseCatalogEntry;
  completedFraction: number;
  personalImprovement: number;
  qualityMultiplier?: number;
  trustMultiplier?: number;
  productiveMinutes?: number;
  priorExerciseRewards?: number;
}

export interface BalancedExerciseReward {
  rawXp: number;
  xp: number;
  diminishingReturnMultiplier: number;
}

export function balancedExerciseXp(input: BalancedExerciseRewardInput): BalancedExerciseReward {
  const completion = clamp(input.completedFraction, 0, 1);
  const progress = 1 + clamp(input.personalImprovement, -0.2, 0.2) * 1.5;
  const quality = clamp(input.qualityMultiplier ?? 1, 0.6, 1.15);
  const trust = clamp(input.trustMultiplier ?? 1, 0, 1);
  const time = timeNormalization(input.productiveMinutes);
  const rawXp = Math.round(32 * input.exercise.baseEffort * completion * progress * quality * trust * time);
  const diminishingReturnMultiplier = diminishingReturns(input.priorExerciseRewards ?? 0);
  return { rawXp, xp: Math.round(rawXp * diminishingReturnMultiplier), diminishingReturnMultiplier };
}

export function diminishingReturns(previousRewardsForExercise: number) {
  if (previousRewardsForExercise <= 1) return 1;
  if (previousRewardsForExercise === 2) return 0.7;
  if (previousRewardsForExercise === 3) return 0.45;
  return 0.2;
}

export function sessionXpCap(productiveMinutes?: number) {
  const minutes = clamp(productiveMinutes ?? 60, 15, 120);
  return Math.round(110 + minutes * 1.5);
}

export function applySessionCap(exerciseXp: number[], productiveMinutes?: number) {
  const raw = exerciseXp.reduce((a, b) => a + Math.max(0, b), 0);
  const cap = sessionXpCap(productiveMinutes);
  return { rawXp: raw, xp: Math.min(raw, cap), cap, capped: raw > cap };
}

function timeNormalization(minutes?: number) {
  if (!minutes) return 1;
  if (minutes < 5) return 0.6;
  if (minutes <= 20) return 0.85;
  if (minutes <= 75) return 1;
  return 1.05;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
