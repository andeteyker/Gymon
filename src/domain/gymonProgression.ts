import { Monster, MuscleGroup, WorkoutReward } from "./types";
import { applyMonsterXp } from "./progression";

export interface GymonProgressionResult {
  monster: Monster;
  gainedGymonXp: number;
  gainedMuscleXp: Partial<Record<MuscleGroup, number>>;
}

export function applyGymonReward(monster: Monster, reward: WorkoutReward): GymonProgressionResult {
  const level = applyMonsterXp(monster.level, monster.xp, reward.xp);
  const muscles = { ...monster.stats.muscles };
  for (const [muscle, xp] of Object.entries(reward.muscleXp))
    muscles[muscle as MuscleGroup] += xp ?? 0;

  return {
    monster: {
      ...monster,
      level: level.level,
      xp: level.xp,
      stats: { ...monster.stats, muscles, performance: { ...monster.stats.performance } },
    },
    gainedGymonXp: reward.xp,
    gainedMuscleXp: { ...reward.muscleXp },
  };
}
