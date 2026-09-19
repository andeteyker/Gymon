export type MuscleGroup = "chest"|"back"|"shoulders"|"biceps"|"triceps"|"core"|"quads"|"hamstrings"|"glutes"|"calves";
export type PerformanceStat = "strength"|"endurance"|"speed"|"recovery";
export interface ExerciseDefinition { id:string; name:string; muscles:Partial<Record<MuscleGroup,number>>; category:"strength"|"cardio"|"bodyweight"; }
export interface WorkoutSet { reps:number; weightKg?:number; completed:boolean; rir?:number; }
export interface WorkoutExercise { exerciseId:string; sets:WorkoutSet[]; }
export interface WorkoutSession { id:string; date:string; exercises:WorkoutExercise[]; durationMinutes?:number; }
export interface ExerciseBaseline { exerciseId:string; estimatedVolume:number; }
export interface MonsterStats { muscles:Record<MuscleGroup,number>; performance:Record<PerformanceStat,number>; }
export interface Monster { id:string; nickname:string; starterFamily:string; formId:string; level:number; xp:number; tokens:number; stats:MonsterStats; activeMoveIds:string[]; }
export interface Move { id:string; name:string; power:number; accuracy:number; priority:number; energyCost:number; requiredMuscle?:MuscleGroup; requiredLevel?:number; evolutionExclusive?:string; }
export interface Evolution { id:string; name:string; stage:number; levelCap:number; previousForms:string[]; nextForms:string[]; requirements:Record<string,number>; exclusiveMoveIds:string[]; }
export interface WorkoutReward { xp:number; relativeImprovement:number; muscleXp:Partial<Record<MuscleGroup,number>>; completedSets:number; }
