export interface BattleFighter { hp:number; attack:number; defense:number; speed:number; }
export interface BattleMove { power:number; priority:number; accuracy:number; }

export function turnOrder(a:{fighter:BattleFighter;move:BattleMove},b:{fighter:BattleFighter;move:BattleMove}){
 if(a.move.priority!==b.move.priority) return a.move.priority>b.move.priority ? ["a","b"] : ["b","a"];
 return a.fighter.speed>=b.fighter.speed ? ["a","b"] : ["b","a"];
}

export function damage(attacker:BattleFighter,defender:BattleFighter,move:BattleMove){
 const raw=(attacker.attack*Math.max(1,move.power))/Math.max(1,defender.defense);
 return Math.max(1,Math.round(raw/10));
}
