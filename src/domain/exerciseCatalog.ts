import { MuscleGroup } from "./types";

export type ExerciseCategory="strength"|"bodyweight"|"cardio"|"plyometric"|"mobility";
export type TrackingMode="weight_reps"|"reps"|"time"|"distance_time";
export type EquipmentId="bodyweight"|"barbell"|"dumbbell"|"bench"|"rack"|"cable"|"machine"|"pullup_bar"|"dip_bars"|"kettlebell"|"bands"|"cardio_machine"|"outdoor_route";

export interface ExerciseCatalogEntry{
 id:string; name:string; category:ExerciseCategory; tracking:TrackingMode;
 equipment:EquipmentId[]; muscles:Partial<Record<MuscleGroup,number>>;
 progression:"load"|"reps"|"duration"|"pace"|"distance"; baseEffort:number;
}

// Optional convenience feature. Core workouts and progression never require a training place.
export interface TrainingPlace{
 id:string; name:string; kind:"gym"|"home"|"outdoor"|"calisthenics"|"custom";
 equipment:EquipmentId[];
}

export function validateMuscleShares(exercise:ExerciseCatalogEntry){
 const sum=Object.values(exercise.muscles).reduce((a,b)=>a+(b??0),0);
 return Math.abs(sum-1)<0.001;
}
export function availableExercises(place:TrainingPlace,catalog:ExerciseCatalogEntry[]){
 const owned=new Set(place.equipment);
 return catalog.filter(ex=>ex.equipment.every(eq=>owned.has(eq)));
}
