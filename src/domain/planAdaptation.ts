import { ExerciseCatalogEntry } from "./exerciseCatalog";
import { TrainingDirection, TrainingProfile, dominantDirection } from "./trainingProfile";

export interface AdaptivePrescription { exerciseId: string; sets: number; reps: number; weightKg?: number; }
export interface PlanAdaptationSuggestion {
  kind: "rep-range" | "exercise-swap" | "volume";
  reason: string;
  replacementExerciseId?: string;
  sets?: number;
  reps?: number;
}

export function suggestPlanAdaptation(
  current: AdaptivePrescription,
  catalog: ExerciseCatalogEntry[],
  profile: TrainingProfile,
  goal: TrainingDirection
): PlanAdaptationSuggestion[] {
  const exercise = catalog.find(x => x.id === current.exerciseId);
  if (!exercise) return [];
  const observed = dominantDirection(profile);
  const direction = profile[goal] >= 25 ? goal : observed;
  const suggestions: PlanAdaptationSuggestion[] = [];

  if (direction === "strength" && exercise.category === "strength" && current.reps > 6)
    suggestions.push({ kind: "rep-range", reason: "Training profile is trending toward strength", reps: 5 });
  if (direction === "hypertrophy" && exercise.category === "strength" && (current.reps < 6 || current.reps > 15))
    suggestions.push({ kind: "rep-range", reason: "Use moderate repetitions for the hypertrophy goal", reps: 10 });
  if (direction === "endurance" && exercise.category === "strength" && current.reps < 12)
    suggestions.push({ kind: "rep-range", reason: "Training profile is trending toward muscular endurance", reps: 15 });
  if (direction === "power" && exercise.category !== "plyometric") {
    const candidate = catalog.find(x => x.category === "plyometric" && sharesPrimaryMuscle(exercise, x));
    if (candidate) suggestions.push({ kind: "exercise-swap", reason: "Introduce an explosive movement for the same primary muscle", replacementExerciseId: candidate.id });
  }
  return suggestions;
}

function sharesPrimaryMuscle(a: ExerciseCatalogEntry, b: ExerciseCatalogEntry) {
  const strongest = (x: ExerciseCatalogEntry) => Object.entries(x.muscles).sort((p, q) => (q[1] ?? 0) - (p[1] ?? 0))[0]?.[0];
  return strongest(a) === strongest(b);
}
