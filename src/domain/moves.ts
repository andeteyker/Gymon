import { Monster, Move, MuscleGroup } from "./types";

const muscleThemes:Record<MuscleGroup,{attack:string;defense:string;status:string}> = {
 chest:{attack:"Drive",defense:"Brace",status:"Presence"},
 back:{attack:"Pull",defense:"Anchor",status:"Control"},
 shoulders:{attack:"Rush",defense:"Shell",status:"Momentum"},
 biceps:{attack:"Hook",defense:"Clamp",status:"Pressure"},
 triceps:{attack:"Breaker",defense:"Lock",status:"Focus"},
 core:{attack:"Torque",defense:"Fortress",status:"Balance"},
 quads:{attack:"Burst",defense:"Stand",status:"Acceleration"},
 hamstrings:{attack:"Snap",defense:"Root",status:"Tempo"},
 glutes:{attack:"Drive",defense:"Base",status:"Power"},
 calves:{attack:"Spring",defense:"Stance",status:"Quickstep"}
};

export const voltexMoves:Move[]=Object.entries(muscleThemes).flatMap(([key,names],index)=>{
 const muscle=key as MuscleGroup;
 const tier=20+index*2;
 return [
  {id:`${muscle}-attack-1`,name:`${title(muscle)} ${names.attack}`,category:"attack",power:32+index,accuracy:95,priority:0,energyCost:10,requiredMuscle:muscle,requiredMuscleXp:tier},
  {id:`${muscle}-defense-1`,name:`${title(muscle)} ${names.defense}`,category:"defense",accuracy:100,priority:1,energyCost:9,requiredMuscle:muscle,requiredMuscleXp:tier,guardPercent:30},
  {id:`${muscle}-status-1`,name:`${title(muscle)} ${names.status}`,category:"status",accuracy:100,priority:0,energyCost:8,requiredMuscle:muscle,requiredMuscleXp:tier,modifiers:[statusEffect(muscle)]}
 ];
});

export function unlockedMoves(monster:Monster):Move[]{
 return voltexMoves.filter(move=>{
  if((move.requiredLevel??1)>monster.level)return false;
  if(move.evolutionExclusive&&move.evolutionExclusive!==monster.formId)return false;
  if(move.requiredMuscle&&monster.stats.muscles[move.requiredMuscle]<(move.requiredMuscleXp??0))return false;
  return true;
 });
}

export function newlyUnlockedMoves(before:Monster,after:Monster):Move[]{
 const known=new Set(unlockedMoves(before).map(m=>m.id));
 return unlockedMoves(after).filter(m=>!known.has(m.id));
}

export function learnMove(monster:Monster,moveId:string,replaceMoveId?:string):Monster{
 const unlocked=unlockedMoves(monster);
 if(!unlocked.some(m=>m.id===moveId))return monster;
 let active=[...monster.activeMoveIds];
 if(active.includes(moveId))return monster;
 if(active.length<4)active.push(moveId);
 else if(replaceMoveId&&active.includes(replaceMoveId))active=active.map(id=>id===replaceMoveId?moveId:id);
 else return monster;
 return {...monster,activeMoveIds:active};
}

function statusEffect(muscle:MuscleGroup){
 const defensive:MuscleGroup[]=["back","core","hamstrings","calves"];
 const speed:MuscleGroup[]=["shoulders","quads"];
 if(defensive.includes(muscle))return {stat:"defense",stages:1,target:"self"} as const;
 if(speed.includes(muscle))return {stat:"speed",stages:1,target:"self"} as const;
 return {stat:"attack",stages:1,target:"self"} as const;
}
function title(value:string){return value.charAt(0).toUpperCase()+value.slice(1);}
