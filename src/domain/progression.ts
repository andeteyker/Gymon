import { ExerciseDefinition, MuscleGroup, WorkoutSet } from "./types";

export function setVolume(set: WorkoutSet, bodyweightKg=0): number {
 const load=set.weightKg ?? bodyweightKg;
 return Math.max(0,load)*Math.max(0,set.reps);
}

export function muscleStimulus(exercise:ExerciseDefinition,sets:WorkoutSet[],bodyweightKg=0){
 const volume=sets.filter(s=>s.completed).reduce((sum,s)=>sum+setVolume(s,bodyweightKg),0);
 const result:Partial<Record<MuscleGroup,number>>={};
 for(const [muscle,share] of Object.entries(exercise.muscles)){
  result[muscle as MuscleGroup]=volume*(share ?? 0);
 }
 return result;
}

// XP should reward personal progress, not simply absolute load.
// The coefficients are placeholders until calibration with test data.
export function progressionXp(relativeImprovement:number,completedWorkingSets:number){
 const progress=Math.max(0,Math.min(relativeImprovement,.25));
 const base=Math.min(completedWorkingSets,20)*8;
 return Math.round(base*(1+progress*4));
}
