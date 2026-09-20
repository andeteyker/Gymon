import { ExerciseCatalogEntry, TrainingPlace } from "@/domain/exerciseCatalog";

export const exerciseCatalog:ExerciseCatalogEntry[]=[
 {id:"barbell-bench-press",name:"Barbell Bench Press",category:"strength",tracking:"weight_reps",equipment:["barbell","bench","rack"],muscles:{chest:.55,triceps:.25,shoulders:.15,core:.05},progression:"load",baseEffort:1},
 {id:"push-up",name:"Push-up",category:"bodyweight",tracking:"reps",equipment:["bodyweight"],muscles:{chest:.5,triceps:.25,shoulders:.15,core:.1},progression:"reps",baseEffort:.8},
 {id:"barbell-squat",name:"Barbell Back Squat",category:"strength",tracking:"weight_reps",equipment:["barbell","rack"],muscles:{quads:.4,glutes:.3,hamstrings:.15,core:.15},progression:"load",baseEffort:1.15},
 {id:"romanian-deadlift",name:"Romanian Deadlift",category:"strength",tracking:"weight_reps",equipment:["barbell"],muscles:{hamstrings:.4,glutes:.3,back:.15,core:.15},progression:"load",baseEffort:1.05},
 {id:"pull-up",name:"Pull-up",category:"bodyweight",tracking:"reps",equipment:["pullup_bar"],muscles:{back:.55,biceps:.25,core:.15,shoulders:.05},progression:"reps",baseEffort:1},
 {id:"overhead-press",name:"Overhead Press",category:"strength",tracking:"weight_reps",equipment:["barbell","rack"],muscles:{shoulders:.5,triceps:.25,core:.15,chest:.1},progression:"load",baseEffort:1},
 {id:"dumbbell-row",name:"One-arm Dumbbell Row",category:"strength",tracking:"weight_reps",equipment:["dumbbell"],muscles:{back:.55,biceps:.25,shoulders:.1,core:.1},progression:"load",baseEffort:.9},
 {id:"walking-lunge",name:"Walking Lunge",category:"strength",tracking:"reps",equipment:["bodyweight"],muscles:{quads:.35,glutes:.35,hamstrings:.2,calves:.1},progression:"reps",baseEffort:.9},
 {id:"plank",name:"Plank",category:"bodyweight",tracking:"time",equipment:["bodyweight"],muscles:{core:.7,shoulders:.15,glutes:.1,quads:.05},progression:"duration",baseEffort:.65},
 {id:"running",name:"Running",category:"cardio",tracking:"distance_time",equipment:["outdoor_route"],muscles:{quads:.3,hamstrings:.25,glutes:.2,calves:.15,core:.1},progression:"pace",baseEffort:1}
];

export const defaultTrainingPlaces:TrainingPlace[]=[
 {id:"commercial-gym",name:"Commercial Gym",kind:"gym",equipment:["bodyweight","barbell","dumbbell","bench","rack","cable","machine","pullup_bar","dip_bars","kettlebell","bands","cardio_machine"]},
 {id:"home-bodyweight",name:"Home",kind:"home",equipment:["bodyweight"]},
 {id:"outdoor",name:"Outdoor",kind:"outdoor",equipment:["bodyweight","outdoor_route"]},
 {id:"calisthenics-park",name:"Calisthenics Park",kind:"calisthenics",equipment:["bodyweight","pullup_bar","dip_bars"]}
];
