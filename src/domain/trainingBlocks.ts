import { ExerciseCatalogEntry } from "./exerciseCatalog";
import { TrainingDirection } from "./trainingProfile";
import { TrainingTrendAnalysis } from "./trainingTrends";

export interface TrainingBlockRecommendation {
  focus: TrainingDirection;
  durationWeeks: number;
  volumeMultiplier: number;
  deloadRecommended: boolean;
  introduceExerciseIds: string[];
  reasons: string[];
}

export function recommendTrainingBlock(
  goal: TrainingDirection,
  analysis: TrainingTrendAnalysis,
  catalog: ExerciseCatalogEntry[]
): TrainingBlockRecommendation {
  const goalTrend = analysis.trends.find(x => x.direction === goal);
  const reasons: string[] = [];
  let volumeMultiplier = 1;
  let deloadRecommended = false;

  if (goalTrend?.plateau) {
    volumeMultiplier = 1.08;
    reasons.push("Goal-specific performance has plateaued across recent weeks");
  }
  if (analysis.adherence < 0.7) {
    volumeMultiplier = 0.9;
    reasons.push("Lower recent adherence favors a more achievable training block");
  }
  if (analysis.adherence > 0.9 && goalTrend && goalTrend.change < -0.05) {
    deloadRecommended = true;
    volumeMultiplier = 0.75;
    reasons.push("High adherence combined with declining performance suggests accumulated fatigue");
  }

  const weakMuscles = new Set(analysis.muscleBalance.filter(x => x.underrepresented).map(x => x.muscle));
  const introduceExerciseIds = catalog
    .filter(exercise => Object.keys(exercise.muscles).some(muscle => weakMuscles.has(muscle as any)))
    .sort((a, b) => b.baseEffort - a.baseEffort)
    .slice(0, 3)
    .map(x => x.id);

  if (introduceExerciseIds.length) reasons.push("Introduce movements covering underrepresented muscle groups");
  if (!reasons.length) reasons.push("Current progression is productive; continue the current block");

  return { focus: goal, durationWeeks: 4, volumeMultiplier, deloadRecommended, introduceExerciseIds, reasons };
}
