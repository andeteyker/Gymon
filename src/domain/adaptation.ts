import { WorkoutSession } from "./types";

export interface ExercisePrescription {
  exerciseId: string;
  sets: number;
  reps: number;
  weightKg: number;
}

export type AdaptationAction = "increase"|"hold"|"deload";

export interface AdaptationResult extends ExercisePrescription {
  action: AdaptationAction;
  reason: string;
}

export interface AdaptationOptions {
  incrementKg?: number;
  deloadPercent?: number;
  failureWindow?: number;
}

export function adaptPrescription(
  current: ExercisePrescription,
  history: WorkoutSession[],
  options: AdaptationOptions = {}
): AdaptationResult {
  const incrementKg=options.incrementKg??2.5;
  const deloadPercent=options.deloadPercent??.075;
  const failureWindow=options.failureWindow??2;
  const relevant=history
    .slice()
    .sort((a,b)=>b.date.localeCompare(a.date))
    .map(s=>s.exercises.find(e=>e.exerciseId===current.exerciseId))
    .filter((e):e is NonNullable<typeof e>=>Boolean(e));

  const latest=relevant[0];
  if(!latest)return {...current,action:"hold",reason:"No training history yet"};

  const targetSets=current.sets;
  const successfulSets=latest.sets.filter(s=>s.completed&&s.reps>=current.reps).length;
  const completedTarget=successfulSets>=targetSets;

  if(completedTarget){
    return {
      ...current,
      weightKg:roundToIncrement(current.weightKg+incrementKg,incrementKg),
      action:"increase",
      reason:"All prescribed sets and reps completed"
    };
  }

  const recentFailures=relevant.slice(0,failureWindow).filter(exercise=>{
    const successful=exercise.sets.filter(s=>s.completed&&s.reps>=current.reps).length;
    return successful<targetSets;
  }).length;

  if(recentFailures>=failureWindow){
    const reduced=current.weightKg*(1-deloadPercent);
    return {
      ...current,
      weightKg:Math.max(0,roundToIncrement(reduced,incrementKg)),
      action:"deload",
      reason:`Target missed in ${failureWindow} consecutive sessions`
    };
  }

  return {...current,action:"hold",reason:"Repeat the load until the target is completed"};
}

function roundToIncrement(value:number,increment:number){
 if(increment<=0)return Math.round(value*10)/10;
 return Math.round(value/increment)*increment;
}
