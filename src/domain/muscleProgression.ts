import { MuscleGroup } from "./types";

export interface MuscleProgress {
 muscle:MuscleGroup;
 xp:number;
 level:number;
 xpIntoLevel:number;
 xpForNextLevel:number;
}

export function muscleXpForLevel(level:number){
 return 80+Math.max(0,level-1)*25;
}

export function muscleLevelFromXp(muscle:MuscleGroup,totalXp:number):MuscleProgress{
 let level=1;
 let remaining=Math.max(0,totalXp);
 let threshold=muscleXpForLevel(level);
 while(remaining>=threshold){
  remaining-=threshold;
  level++;
  threshold=muscleXpForLevel(level);
 }
 return {muscle,xp:totalXp,level,xpIntoLevel:remaining,xpForNextLevel:threshold};
}

export function allMuscleLevels(values:Record<MuscleGroup,number>){
 return (Object.entries(values) as [MuscleGroup,number][]).map(([muscle,xp])=>muscleLevelFromXp(muscle,xp));
}
