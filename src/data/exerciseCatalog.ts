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
,
 {id:"incline-dumbbell-press",name:"Incline Dumbbell Press",category:"strength",tracking:"weight_reps",equipment:["dumbbell","bench"],muscles:{chest:.5,shoulders:.25,triceps:.2,core:.05},progression:"load",baseEffort:.95},
 {id:"dumbbell-bench-press",name:"Dumbbell Bench Press",category:"strength",tracking:"weight_reps",equipment:["dumbbell","bench"],muscles:{chest:.5,triceps:.25,shoulders:.2,core:.05},progression:"load",baseEffort:.95},
 {id:"cable-fly",name:"Cable Fly",category:"strength",tracking:"weight_reps",equipment:["cable"],muscles:{chest:.75,shoulders:.15,core:.1},progression:"load",baseEffort:.7},
 {id:"dip",name:"Dip",category:"bodyweight",tracking:"reps",equipment:["dip_bars"],muscles:{chest:.35,triceps:.4,shoulders:.15,core:.1},progression:"reps",baseEffort:.95},
 {id:"lat-pulldown",name:"Lat Pulldown",category:"strength",tracking:"weight_reps",equipment:["cable"],muscles:{back:.6,biceps:.25,shoulders:.1,core:.05},progression:"load",baseEffort:.85},
 {id:"seated-cable-row",name:"Seated Cable Row",category:"strength",tracking:"weight_reps",equipment:["cable"],muscles:{back:.6,biceps:.2,shoulders:.15,core:.05},progression:"load",baseEffort:.85},
 {id:"barbell-row",name:"Barbell Row",category:"strength",tracking:"weight_reps",equipment:["barbell"],muscles:{back:.5,biceps:.2,shoulders:.1,hamstrings:.05,core:.15},progression:"load",baseEffort:1},
 {id:"deadlift",name:"Conventional Deadlift",category:"strength",tracking:"weight_reps",equipment:["barbell"],muscles:{back:.2,glutes:.25,hamstrings:.25,quads:.15,core:.15},progression:"load",baseEffort:1.2},
 {id:"dumbbell-shoulder-press",name:"Dumbbell Shoulder Press",category:"strength",tracking:"weight_reps",equipment:["dumbbell"],muscles:{shoulders:.55,triceps:.25,chest:.1,core:.1},progression:"load",baseEffort:.9},
 {id:"lateral-raise",name:"Lateral Raise",category:"strength",tracking:"weight_reps",equipment:["dumbbell"],muscles:{shoulders:.8,core:.1,triceps:.1},progression:"load",baseEffort:.65},
 {id:"face-pull",name:"Face Pull",category:"strength",tracking:"weight_reps",equipment:["cable"],muscles:{shoulders:.5,back:.4,biceps:.05,core:.05},progression:"load",baseEffort:.65},
 {id:"barbell-curl",name:"Barbell Curl",category:"strength",tracking:"weight_reps",equipment:["barbell"],muscles:{biceps:.8,shoulders:.1,core:.1},progression:"load",baseEffort:.65},
 {id:"dumbbell-curl",name:"Dumbbell Curl",category:"strength",tracking:"weight_reps",equipment:["dumbbell"],muscles:{biceps:.8,shoulders:.1,core:.1},progression:"load",baseEffort:.65},
 {id:"hammer-curl",name:"Hammer Curl",category:"strength",tracking:"weight_reps",equipment:["dumbbell"],muscles:{biceps:.75,back:.05,shoulders:.1,core:.1},progression:"load",baseEffort:.65},
 {id:"cable-triceps-pushdown",name:"Cable Triceps Pushdown",category:"strength",tracking:"weight_reps",equipment:["cable"],muscles:{triceps:.85,shoulders:.05,core:.1},progression:"load",baseEffort:.65},
 {id:"skull-crusher",name:"Skull Crusher",category:"strength",tracking:"weight_reps",equipment:["barbell","bench"],muscles:{triceps:.8,shoulders:.1,core:.1},progression:"load",baseEffort:.7},
 {id:"goblet-squat",name:"Goblet Squat",category:"strength",tracking:"weight_reps",equipment:["dumbbell"],muscles:{quads:.4,glutes:.3,hamstrings:.1,core:.15,calves:.05},progression:"load",baseEffort:.9},
 {id:"leg-press",name:"Leg Press",category:"strength",tracking:"weight_reps",equipment:["machine"],muscles:{quads:.45,glutes:.3,hamstrings:.15,calves:.1},progression:"load",baseEffort:1},
 {id:"leg-extension",name:"Leg Extension",category:"strength",tracking:"weight_reps",equipment:["machine"],muscles:{quads:.9,core:.1},progression:"load",baseEffort:.65},
 {id:"leg-curl",name:"Leg Curl",category:"strength",tracking:"weight_reps",equipment:["machine"],muscles:{hamstrings:.85,calves:.1,core:.05},progression:"load",baseEffort:.7},
 {id:"hip-thrust",name:"Hip Thrust",category:"strength",tracking:"weight_reps",equipment:["barbell","bench"],muscles:{glutes:.65,hamstrings:.2,quads:.05,core:.1},progression:"load",baseEffort:.9},
 {id:"standing-calf-raise",name:"Standing Calf Raise",category:"strength",tracking:"weight_reps",equipment:["machine"],muscles:{calves:.9,quads:.05,core:.05},progression:"load",baseEffort:.65},
 {id:"bulgarian-split-squat",name:"Bulgarian Split Squat",category:"strength",tracking:"weight_reps",equipment:["dumbbell","bench"],muscles:{quads:.35,glutes:.35,hamstrings:.15,calves:.05,core:.1},progression:"load",baseEffort:1},
 {id:"hanging-leg-raise",name:"Hanging Leg Raise",category:"bodyweight",tracking:"reps",equipment:["pullup_bar"],muscles:{core:.75,shoulders:.1,back:.1,quads:.05},progression:"reps",baseEffort:.8},
 {id:"crunch",name:"Crunch",category:"bodyweight",tracking:"reps",equipment:["bodyweight"],muscles:{core:.9,quads:.05,glutes:.05},progression:"reps",baseEffort:.55},
 {id:"burpee",name:"Burpee",category:"plyometric",tracking:"reps",equipment:["bodyweight"],muscles:{quads:.2,glutes:.15,calves:.1,chest:.15,triceps:.1,shoulders:.1,core:.2},progression:"reps",baseEffort:1.05},
 {id:"box-jump",name:"Box Jump",category:"plyometric",tracking:"reps",equipment:["bodyweight"],muscles:{quads:.35,glutes:.3,hamstrings:.15,calves:.15,core:.05},progression:"reps",baseEffort:.9},
 {id:"sprint",name:"Sprint",category:"cardio",tracking:"distance_time",equipment:["outdoor_route"],muscles:{quads:.3,hamstrings:.25,glutes:.25,calves:.15,core:.05},progression:"pace",baseEffort:1.15},
 {id:"cycling",name:"Cycling",category:"cardio",tracking:"distance_time",equipment:["outdoor_route"],muscles:{quads:.4,glutes:.2,hamstrings:.2,calves:.1,core:.1},progression:"pace",baseEffort:.9},
 {id:"jump-rope",name:"Jump Rope",category:"cardio",tracking:"time",equipment:["bodyweight"],muscles:{calves:.35,quads:.2,shoulders:.15,core:.15,hamstrings:.1,glutes:.05},progression:"duration",baseEffort:.8}
];

export const defaultTrainingPlaces:TrainingPlace[]=[
 {id:"commercial-gym",name:"Commercial Gym",kind:"gym",equipment:["bodyweight","barbell","dumbbell","bench","rack","cable","machine","pullup_bar","dip_bars","kettlebell","bands","cardio_machine"]},
 {id:"home-bodyweight",name:"Home",kind:"home",equipment:["bodyweight"]},
 {id:"outdoor",name:"Outdoor",kind:"outdoor",equipment:["bodyweight","outdoor_route"]},
 {id:"calisthenics-park",name:"Calisthenics Park",kind:"calisthenics",equipment:["bodyweight","pullup_bar","dip_bars"]}
];
