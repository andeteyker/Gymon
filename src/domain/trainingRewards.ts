import { ExerciseCatalogEntry } from "./exerciseCatalog";

export interface ExerciseRewardInput{
 exercise:ExerciseCatalogEntry; completedFraction:number; personalImprovement:number;
 qualityMultiplier?:number; trustMultiplier?:number;
}
export function exerciseTrainingXp(input:ExerciseRewardInput){
 const completion=clamp(input.completedFraction,0,1);
 const progress=1+clamp(input.personalImprovement,-.25,.25)*2;
 const quality=clamp(input.qualityMultiplier??1,.5,1.2);
 const trust=clamp(input.trustMultiplier??1,0,1);
 return Math.round(40*input.exercise.baseEffort*completion*progress*quality*trust);
}
export function distributeMuscleXp(exercise:ExerciseCatalogEntry,xp:number){
 return Object.fromEntries(Object.entries(exercise.muscles).map(([muscle,share])=>[muscle,Math.round(xp*(share??0))]));
}
function clamp(v:number,min:number,max:number){return Math.max(min,Math.min(max,v));}
