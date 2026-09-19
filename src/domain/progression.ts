import { ExerciseBaseline, ExerciseDefinition, MuscleGroup, WorkoutReward, WorkoutSession, WorkoutSet, WorkoutTrust, WorkoutTrustFlag } from "./types";

export function setVolume(set:WorkoutSet,bodyweightKg=0){const load=set.weightKg ?? bodyweightKg;return Math.max(0,load)*Math.max(0,set.reps);}
export function exerciseVolume(sets:WorkoutSet[],bodyweightKg=0){return sets.filter(s=>s.completed).reduce((n,s)=>n+setVolume(s,bodyweightKg),0);}
export function muscleStimulus(exercise:ExerciseDefinition,sets:WorkoutSet[],bodyweightKg=0){
 const volume=exerciseVolume(sets,bodyweightKg); const result:Partial<Record<MuscleGroup,number>>={};
 for(const [muscle,share] of Object.entries(exercise.muscles)) result[muscle as MuscleGroup]=volume*(share??0);
 return result;
}
export function relativeImprovement(current:number,baseline:number){if(baseline<=0)return 0;return (current-baseline)/baseline;}
export function progressionXp(improvement:number,completedWorkingSets:number){
 const positive=Math.max(0,Math.min(improvement,.25)); const base=Math.min(completedWorkingSets,20)*8;
 return Math.round(base*(1+positive*4));
}

export function assessWorkoutTrust(session:WorkoutSession,baselines:ExerciseBaseline[]):WorkoutTrust{
 const flags=new Set<WorkoutTrustFlag>(); let completedSets=0;
 for(const item of session.exercises){
  const completed=item.sets.filter(s=>s.completed); completedSets+=completed.length;
  if(completed.some(s=>s.reps>100||(s.weightKg??0)>500||(s.weightKg??0)<0||s.reps<0)) flags.add("implausible-set");
  const current=exerciseVolume(completed);
  const baseline=baselines.find(x=>x.exerciseId===item.exerciseId)?.estimatedVolume;
  if(baseline&&current>baseline*2.5) flags.add("extreme-volume-jump");
 }
 if(completedSets>40)flags.add("excessive-working-sets");
 let score=100;
 if(flags.has("implausible-set"))score-=70;
 if(flags.has("extreme-volume-jump"))score-=35;
 if(flags.has("excessive-working-sets"))score-=20;
 score=Math.max(0,score);
 const rewardMultiplier=score<30?0:score<70?.5:1;
 return {score,flags:[...flags],rewardMultiplier};
}

export function evaluateWorkout(session:WorkoutSession,definitions:ExerciseDefinition[],baselines:ExerciseBaseline[]):WorkoutReward{
 let completedSets=0,totalCurrent=0,totalBaseline=0; const muscleRaw:Partial<Record<MuscleGroup,number>>={};
 for(const item of session.exercises){
  const def=definitions.find(x=>x.id===item.exerciseId); if(!def)continue;
  const current=exerciseVolume(item.sets); const baseline=baselines.find(x=>x.exerciseId===item.exerciseId)?.estimatedVolume ?? current;
  totalCurrent+=current; totalBaseline+=baseline; completedSets+=item.sets.filter(s=>s.completed).length;
  const stimulus=muscleStimulus(def,item.sets);
  for(const [m,v] of Object.entries(stimulus)) muscleRaw[m as MuscleGroup]=(muscleRaw[m as MuscleGroup]??0)+(v??0);
 }
 const improvement=relativeImprovement(totalCurrent,totalBaseline);
 const rawXp=progressionXp(improvement,completedSets);
 const trust=assessWorkoutTrust(session,baselines);
 const xp=Math.round(rawXp*trust.rewardMultiplier);
 const totalStimulus=Object.values(muscleRaw).reduce((a,b)=>a+(b??0),0);
 const muscleXp:Partial<Record<MuscleGroup,number>>={};
 for(const [m,v] of Object.entries(muscleRaw)) muscleXp[m as MuscleGroup]=totalStimulus?Math.round(xp*(v??0)/totalStimulus):0;
 return {xp,rawXp,relativeImprovement:improvement,muscleXp,completedSets,trust};
}
export function xpForLevel(level:number){return 100+Math.max(0,level-1)*35;}
export function applyMonsterXp(level:number,xp:number,gained:number){let l=level,x=xp+gained;while(x>=xpForLevel(l)){x-=xpForLevel(l);l++;}return {level:l,xp:x,levelsGained:l-level};}
