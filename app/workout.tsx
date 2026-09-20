import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { demoWorkout } from "@/data/demoWorkout";
import { exercises } from "@/data/exercises";
import { workoutSessionRepository } from "@/data/workoutSessionRepository";
import { completeWorkoutFlow } from "@/domain/workoutFlow";
import { monsterRepository } from "@/data/monsterRepository";
import { applyWorkoutToMonster } from "@/domain/gymon";
import { AdaptationResult } from "@/domain/adaptation";
import { Monster, Move, WorkoutReward, WorkoutSession } from "@/domain/types";
import { learnMove, newlyUnlockedMoves, voltexMoves } from "@/domain/moves";

const baselines=demoWorkout.exercises.map(e=>({exerciseId:e.exerciseId,estimatedVolume:e.sets*e.reps*e.weightKg}));
const prescriptions=demoWorkout.exercises.map(e=>({exerciseId:e.exerciseId,sets:e.sets,reps:e.reps,weightKg:e.weightKg}));

export default function WorkoutScreen(){
 const [done,setDone]=useState<Record<string,boolean[]>>(()=>Object.fromEntries(demoWorkout.exercises.map(e=>[e.exerciseId,Array(e.sets).fill(false)])));
 const [result,setResult]=useState<WorkoutReward|null>(null);
 const [nextWorkout,setNextWorkout]=useState<AdaptationResult[]>([]);
 const [saving,setSaving]=useState(false);
 const [monster,setMonster]=useState<Monster|null>(null);
 const [evolved,setEvolved]=useState(false);
 const [moveQueue,setMoveQueue]=useState<Move[]>([]);
 const [replaceMove,setReplaceMove]=useState<Move|null>(null);
 const completed=useMemo(()=>Object.values(done).flat().filter(Boolean).length,[done]);
 function toggle(id:string,index:number){setResult(null);setNextWorkout([]);setDone(prev=>({...prev,[id]:prev[id].map((v,i)=>i===index?!v:v)}));}
 async function finish(){
  if(saving)return; setSaving(true);
  const session:WorkoutSession={id:`${demoWorkout.id}-${Date.now()}`,date:new Date().toISOString(),exercises:demoWorkout.exercises.map(e=>({exerciseId:e.exerciseId,sets:Array.from({length:e.sets},(_,i)=>({reps:e.reps,weightKg:e.weightKg,completed:done[e.exerciseId][i]}))}))};
  try{
   const history=await workoutSessionRepository.list();
   await workoutSessionRepository.save(session);
   const flow=completeWorkoutFlow(session,prescriptions,history,exercises,baselines);
   const currentMonster=await monsterRepository.getActive();
   const updatedMonster=applyWorkoutToMonster(currentMonster,flow.reward);
   await monsterRepository.save(updatedMonster);
   setMoveQueue(newlyUnlockedMoves(currentMonster,updatedMonster));
   setEvolved(currentMonster.formId!==updatedMonster.formId);
   setMonster(updatedMonster);
   setResult(flow.reward); setNextWorkout(flow.nextWorkout);
  }finally{setSaving(false);}
 }
 async function acceptMove(){
  if(!monster||!moveQueue[0])return;
  if(monster.activeMoveIds.length>=4){setReplaceMove(moveQueue[0]);return;}
  const updated=learnMove(monster,moveQueue[0].id); await monsterRepository.save(updated); setMonster(updated); setMoveQueue(q=>q.slice(1));
 }
 async function replaceActive(moveId:string){
  if(!monster||!replaceMove)return;
  const updated=learnMove(monster,replaceMove.id,moveId); await monsterRepository.save(updated); setMonster(updated); setReplaceMove(null); setMoveQueue(q=>q.slice(1));
 }
 function declineMove(){setReplaceMove(null);setMoveQueue(q=>q.slice(1));}
 return <SafeAreaView style={styles.page}><ScrollView contentContainerStyle={styles.content}>
  <Text style={styles.kicker}>TODAY</Text><Text style={styles.title}>{demoWorkout.name}</Text>
  <Text style={styles.meta}>{completed}/{demoWorkout.exercises.reduce((n,e)=>n+e.sets,0)} sets complete · ~{demoWorkout.estimatedMinutes} min</Text>
  {demoWorkout.exercises.map(e=><View key={e.exerciseId} style={styles.card}><Text style={styles.exercise}>{e.name}</Text><Text style={styles.target}>{e.sets} × {e.reps} @ {e.weightKg} kg</Text><View style={styles.setRow}>{Array.from({length:e.sets},(_,i)=><Pressable key={i} onPress={()=>toggle(e.exerciseId,i)} style={[styles.setButton,done[e.exerciseId][i]&&styles.setDone]}><Text style={[styles.setText,done[e.exerciseId][i]&&styles.setTextDone]}>{done[e.exerciseId][i]?"✓":i+1}</Text></Pressable>)}</View></View>)}
  <Pressable disabled={!completed||saving} onPress={finish} style={[styles.finish,(!completed||saving)&&styles.disabled]}><Text style={styles.finishText}>{saving?"SAVING...":"FINISH WORKOUT"}</Text></Pressable>
  {result&&<View style={styles.reward}><Text style={styles.rewardTitle}>WORKOUT COMPLETE · SAVED</Text><Text style={styles.xp}>+{result.xp} XP</Text><Text style={styles.rewardText}>{monster?.nickname??"Voltex"} Lv.{monster?.level} · {monster?.xp}/{monster?100+(monster.level-1)*35:0} XP</Text><Text style={styles.rewardText}>Form: {monster?.formId==="voltex-stage-2"?"Stage 2":"Stage 1"}</Text>{evolved&&<Text style={styles.evolution}>EVOLUTION! Voltex reached Stage 2.</Text>}<Text style={styles.rewardText}>Training trust: {result.trust.score}/100</Text>{result.trust.flags.length>0&&<Text style={styles.warning}>XP adjusted: {result.trust.flags.join(", ")}</Text>}</View>}
  {moveQueue[0]&&<View style={styles.learn}><Text style={styles.rewardTitle}>NEW MOVE UNLOCKED</Text><Text style={styles.moveName}>{moveQueue[0].name}</Text><Text style={styles.rewardText}>{moveQueue[0].category.toUpperCase()} · {moveQueue[0].requiredMuscle?.toUpperCase()}</Text>{!replaceMove?<><Text style={styles.prompt}>Should {monster?.nickname??"Voltex"} learn this move?</Text><View style={styles.choiceRow}><Pressable style={styles.choice} onPress={acceptMove}><Text style={styles.choiceText}>LEARN</Text></Pressable><Pressable style={styles.secondary} onPress={declineMove}><Text style={styles.secondaryText}>NOT NOW</Text></Pressable></View></>:<><Text style={styles.prompt}>Four moves are already active. Which move should be replaced?</Text>{monster?.activeMoveIds.map(id=>{const move=voltexMoves.find(m=>m.id===id);return <Pressable key={id} style={styles.replace} onPress={()=>replaceActive(id)}><Text style={styles.choiceText}>{move?.name??id}</Text></Pressable>})}<Pressable style={styles.secondary} onPress={declineMove}><Text style={styles.secondaryText}>CANCEL</Text></Pressable></>}</View>}
  {nextWorkout.length>0&&<View style={styles.reward}><Text style={styles.rewardTitle}>NEXT WORKOUT</Text>{nextWorkout.map(n=><Text key={n.exerciseId} style={styles.rewardText}>{demoWorkout.exercises.find(e=>e.exerciseId===n.exerciseId)?.name}: {n.sets} × {n.reps} @ {n.weightKg} kg · {n.action.toUpperCase()}</Text>)}</View>}
 </ScrollView></SafeAreaView>
}
const styles=StyleSheet.create({page:{flex:1,backgroundColor:"#0B1020"},content:{padding:24,paddingBottom:50},kicker:{color:"#8F9AB7",fontWeight:"800",marginTop:20},title:{color:"#F7F8FC",fontSize:32,fontWeight:"900",marginTop:6},meta:{color:"#AEB8D0",marginTop:6,marginBottom:24},card:{backgroundColor:"#151D34",padding:18,borderRadius:18,marginBottom:12},exercise:{color:"#F7F8FC",fontSize:18,fontWeight:"800"},target:{color:"#AEB8D0",fontSize:16,marginTop:6},setRow:{flexDirection:"row",gap:10,marginTop:16},setButton:{width:44,height:44,borderRadius:12,backgroundColor:"#27314D",alignItems:"center",justifyContent:"center"},setDone:{backgroundColor:"#F7F8FC"},setText:{color:"#F7F8FC",fontWeight:"900"},setTextDone:{color:"#0B1020"},finish:{marginTop:12,backgroundColor:"#F7F8FC",padding:18,borderRadius:16,alignItems:"center"},disabled:{opacity:.3},finishText:{fontWeight:"900",color:"#0B1020"},reward:{backgroundColor:"#151D34",borderRadius:22,padding:22,marginTop:20},rewardTitle:{color:"#9CA8C7",fontWeight:"800"},xp:{color:"#F7F8FC",fontSize:36,fontWeight:"900",marginVertical:8},rewardText:{color:"#AEB8D0",fontWeight:"700",marginTop:5},warning:{color:"#F7F8FC",fontWeight:"800",marginTop:10},evolution:{color:"#F7F8FC",fontSize:20,fontWeight:"900",marginTop:12},learn:{backgroundColor:"#F7F8FC",borderRadius:22,padding:22,marginTop:20},moveName:{color:"#0B1020",fontSize:28,fontWeight:"900",marginTop:8},prompt:{color:"#0B1020",fontSize:16,fontWeight:"800",marginTop:16},choiceRow:{flexDirection:"row",gap:10,marginTop:14},choice:{backgroundColor:"#0B1020",padding:14,borderRadius:12,flex:1,alignItems:"center"},choiceText:{color:"#F7F8FC",fontWeight:"900"},secondary:{borderWidth:1,borderColor:"#27314D",padding:14,borderRadius:12,flex:1,alignItems:"center",marginTop:10},secondaryText:{color:"#0B1020",fontWeight:"900"},replace:{backgroundColor:"#27314D",padding:14,borderRadius:12,marginTop:8}});
