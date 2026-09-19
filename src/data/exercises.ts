import { ExerciseDefinition } from "@/domain/types";

export const exercises: ExerciseDefinition[] = [
 {id:"bench-press",name:"Bench Press",category:"strength",muscles:{chest:.55,triceps:.25,shoulders:.20}},
 {id:"butterfly",name:"Butterfly",category:"strength",muscles:{chest:.85,shoulders:.15}},
 {id:"overhead-press",name:"Overhead Press",category:"strength",muscles:{shoulders:.60,triceps:.25,core:.15}},
 {id:"squat",name:"Squat",category:"strength",muscles:{quads:.40,glutes:.30,hamstrings:.15,core:.15}},
 {id:"deadlift",name:"Deadlift",category:"strength",muscles:{hamstrings:.30,glutes:.25,back:.25,core:.20}},
 {id:"pull-up",name:"Pull-up",category:"bodyweight",muscles:{back:.60,biceps:.25,core:.15}}
];
