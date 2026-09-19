import { Monster } from "@/domain/types";
import { starterVoltex } from "@/domain/gymon";

export interface MonsterRepository { getActive():Promise<Monster>; save(monster:Monster):Promise<void>; }

class InMemoryMonsterRepository implements MonsterRepository{
 private active:Monster=clone(starterVoltex);
 async getActive(){return clone(this.active);}
 async save(monster:Monster){this.active=clone(monster);}
}
function clone(m:Monster):Monster{return {...m,stats:{muscles:{...m.stats.muscles},performance:{...m.stats.performance}},activeMoveIds:[...m.activeMoveIds]};}
export const monsterRepository:MonsterRepository=new InMemoryMonsterRepository();
