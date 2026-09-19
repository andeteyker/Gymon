import { Monster, Move } from "./types";

export const voltexMoves:Move[]=[
 {id:"power-jab",name:"Power Jab",power:28,accuracy:100,priority:1,energyCost:8,requiredLevel:1},
 {id:"chest-drive",name:"Chest Drive",power:42,accuracy:95,priority:0,energyCost:14,requiredMuscle:"chest",requiredLevel:2},
 {id:"shoulder-rush",name:"Shoulder Rush",power:38,accuracy:100,priority:1,energyCost:12,requiredMuscle:"shoulders",requiredLevel:3},
 {id:"triceps-breaker",name:"Triceps Breaker",power:50,accuracy:90,priority:0,energyCost:18,requiredMuscle:"triceps",requiredLevel:4},
 {id:"voltage-crash",name:"Voltage Crash",power:65,accuracy:85,priority:-1,energyCost:25,requiredLevel:5,evolutionExclusive:"voltex-stage-2"}
];

export function unlockedMoves(monster:Monster):Move[]{
 return voltexMoves.filter(move=>{
  if((move.requiredLevel??1)>monster.level)return false;
  if(move.evolutionExclusive&&move.evolutionExclusive!==monster.formId)return false;
  if(move.requiredMuscle&&monster.stats.muscles[move.requiredMuscle]<muscleRequirement(move.requiredLevel??1))return false;
  return true;
 });
}

export function syncMoveLoadout(monster:Monster):Monster{
 const unlocked=unlockedMoves(monster);
 const valid=monster.activeMoveIds.filter(id=>unlocked.some(m=>m.id===id));
 for(const move of unlocked)if(valid.length<4&&!valid.includes(move.id))valid.push(move.id);
 return {...monster,activeMoveIds:valid.slice(0,4)};
}

function muscleRequirement(level:number){return level*20;}
