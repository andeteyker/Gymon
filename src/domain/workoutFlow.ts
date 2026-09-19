import { ExercisePrescription, AdaptationResult, adaptPrescription } from "./adaptation";
import { ExerciseBaseline, ExerciseDefinition, WorkoutReward, WorkoutSession } from "./types";
import { evaluateWorkout } from "./progression";

export interface CompletedWorkoutFlow {
  reward: WorkoutReward;
  nextWorkout: AdaptationResult[];
}

export function completeWorkoutFlow(
 session:WorkoutSession,
 current:ExercisePrescription[],
 history:WorkoutSession[],
 definitions:ExerciseDefinition[],
 baselines:ExerciseBaseline[]
):CompletedWorkoutFlow{
 const reward=evaluateWorkout(session,definitions,baselines);
 const historyIncludingCurrent=[session,...history.filter(h=>h.id!==session.id)];
 const nextWorkout=current.map(p=>adaptPrescription(p,historyIncludingCurrent));
 return {reward,nextWorkout};
}
