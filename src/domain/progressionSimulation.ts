import { ExerciseCatalogEntry } from "./exerciseCatalog";
import { applySessionCap, balancedExerciseXp } from "./xpBalancing";

export type SimulationStyle = "strength" | "hypertrophy" | "calisthenics" | "endurance" | "mixed";

export interface SimulatedAthlete {
  style: SimulationStyle;
  sessionsPerWeek: number;
  exercisesPerSession: number;
  productiveMinutes: number;
  completion: number;
  weeklyImprovement: number;
  quality: number;
  trust: number;
}

export interface SimulationResult {
  style: SimulationStyle;
  weeks: number;
  sessions: number;
  totalXp: number;
  averageXpPerWeek: number;
  averageXpPerSession: number;
}

export function simulateProgression(
  athlete: SimulatedAthlete,
  catalog: ExerciseCatalogEntry[],
  weeks = 12
): SimulationResult {
  let totalXp = 0;
  let sessions = 0;
  for (let week = 0; week < weeks; week++) {
    for (let session = 0; session < athlete.sessionsPerWeek; session++) {
      const exercises = selectExercises(athlete.style, catalog, athlete.exercisesPerSession);
      const rewards = exercises.map((exercise, index) =>
        balancedExerciseXp({
          exercise,
          completedFraction: athlete.completion,
          personalImprovement: decayedImprovement(athlete.weeklyImprovement, week),
          qualityMultiplier: athlete.quality,
          trustMultiplier: athlete.trust,
          productiveMinutes: athlete.productiveMinutes / Math.max(1, exercises.length),
          priorExerciseRewards: index > 0 && exercises[index - 1]?.id === exercise.id ? 1 : 0,
        }).xp
      );
      totalXp += applySessionCap(rewards, athlete.productiveMinutes).xp;
      sessions++;
    }
  }
  return {
    style: athlete.style,
    weeks,
    sessions,
    totalXp,
    averageXpPerWeek: Math.round(totalXp / weeks),
    averageXpPerSession: sessions ? Math.round(totalXp / sessions) : 0,
  };
}

export function compareTrainingStyles(catalog: ExerciseCatalogEntry[], weeks = 12) {
  const athletes: SimulatedAthlete[] = [
    { style:"strength",sessionsPerWeek:4,exercisesPerSession:5,productiveMinutes:65,completion:.95,weeklyImprovement:.02,quality:1,trust:1 },
    { style:"hypertrophy",sessionsPerWeek:4,exercisesPerSession:7,productiveMinutes:70,completion:.95,weeklyImprovement:.02,quality:1,trust:1 },
    { style:"calisthenics",sessionsPerWeek:4,exercisesPerSession:6,productiveMinutes:60,completion:.95,weeklyImprovement:.02,quality:1,trust:1 },
    { style:"endurance",sessionsPerWeek:4,exercisesPerSession:2,productiveMinutes:55,completion:.95,weeklyImprovement:.02,quality:1,trust:1 },
    { style:"mixed",sessionsPerWeek:4,exercisesPerSession:5,productiveMinutes:60,completion:.95,weeklyImprovement:.02,quality:1,trust:1 },
  ];
  return athletes.map(a => simulateProgression(a, catalog, weeks));
}

function selectExercises(style: SimulationStyle, catalog: ExerciseCatalogEntry[], count: number) {
  const preferred = catalog.filter(exercise => {
    if (style === "strength" || style === "hypertrophy") return exercise.category === "strength";
    if (style === "calisthenics") return exercise.category === "bodyweight";
    if (style === "endurance") return exercise.category === "cardio";
    return true;
  });
  const pool = preferred.length ? preferred : catalog;
  return Array.from({ length: count }, (_, i) => pool[i % pool.length]);
}

function decayedImprovement(initial: number, week: number) {
  return Math.max(0.0025, initial * Math.pow(0.94, week));
}
