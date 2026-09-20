import { ExerciseCatalogEntry } from "./exerciseCatalog";

export type TrainingDirection = "strength" | "hypertrophy" | "endurance" | "power" | "calisthenics";
export type TrainingProfile = Record<TrainingDirection, number>;

export interface TrainingSignal {
  exercise: ExerciseCatalogEntry;
  reps?: number;
  durationMinutes?: number;
  relativeIntensity?: number;
}

export function inferTrainingProfile(signals: TrainingSignal[]): TrainingProfile {
  const profile: TrainingProfile = { strength: 0, hypertrophy: 0, endurance: 0, power: 0, calisthenics: 0 };
  for (const signal of signals) {
    const reps = signal.reps ?? 0;
    const intensity = signal.relativeIntensity ?? 0.6;
    const duration = signal.durationMinutes ?? 0;
    if (signal.exercise.category === "cardio") { profile.endurance += Math.max(1, duration / 10); continue; }
    if (signal.exercise.category === "plyometric") { profile.power += 2; continue; }
    if (signal.exercise.category === "bodyweight") profile.calisthenics += 1.5;
    if (reps > 0 && reps <= 6 && intensity >= 0.75) profile.strength += 2;
    else if (reps >= 6 && reps <= 15) profile.hypertrophy += 2;
    else if (reps > 15) profile.endurance += 1;
  }
  const total = Object.values(profile).reduce((a, b) => a + b, 0) || 1;
  for (const key of Object.keys(profile) as TrainingDirection[]) profile[key] = Math.round(profile[key] / total * 100);
  return profile;
}

export function dominantDirection(profile: TrainingProfile): TrainingDirection {
  return (Object.entries(profile) as [TrainingDirection, number][]).sort((a, b) => b[1] - a[1])[0][0];
}
