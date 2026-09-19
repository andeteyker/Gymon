import { Monster, MuscleGroup, WorkoutReward } from "./types";
import { applyMonsterXp } from "./progression";

const muscles:MuscleGroup[]=["chest","back","shoulders","biceps","triceps","core","quads","hamstrings","glutes","calves"];

export const starterVoltex:Monster={
 id:"voltex-001",nickname:"Voltex",starterFamily:"voltex",formId:"voltex-stage-1",level:1,xp:0,tokens:0,
 stats:{muscles:Object.fromEntries(muscles.map(m=>[m,0])) as Record<MuscleGroup,number>,performance:{strength:0,endurance:0,speed:0,recovery:0}},
 activeMoveIds:[]
};

export function applyWorkoutToMonster(monster:Monster,reward:WorkoutReward):Monster{
 const level=applyMonsterXp(monster.level,monster.xp,reward.xp);
 const next:Monster={...monster,level:level.level,xp:level.xp,stats:{...monster.stats,muscles:{...monster.stats.muscles},performance:{...monster.stats.performance}}};
 for(const [muscle,xp] of Object.entries(reward.muscleXp)) next.stats.muscles[muscle as MuscleGroup]+=(xp??0);
 next.stats.performance.strength+=Math.max(0,Math.round(reward.relativeImprovement*10));
 if(next.level>=5&&next.formId==="voltex-stage-1")next.formId="voltex-stage-2";
 return next;
}
