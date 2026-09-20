import { MuscleGroup } from "./types";
import { TrainingDirection, TrainingProfile } from "./trainingProfile";

export interface WeeklyTrainingSnapshot {
  week: string;
  profile: TrainingProfile;
  muscleXp: Partial<Record<MuscleGroup, number>>;
  performance: Partial<Record<TrainingDirection, number>>;
  completedSessions: number;
  plannedSessions: number;
}

export interface TrainingTrend {
  direction: TrainingDirection;
  change: number;
  plateau: boolean;
}

export interface MuscleBalance {
  muscle: MuscleGroup;
  share: number;
  underrepresented: boolean;
}

export interface TrainingTrendAnalysis {
  trends: TrainingTrend[];
  muscleBalance: MuscleBalance[];
  adherence: number;
}

export function analyzeTrainingTrends(history: WeeklyTrainingSnapshot[]): TrainingTrendAnalysis {
  const recent = history.slice(-4);
  const previous = history.slice(-8, -4);
  const directions: TrainingDirection[] = ["strength", "hypertrophy", "endurance", "power", "calisthenics"];

  const trends = directions.map(direction => {
    const current = average(recent.map(x => x.performance[direction] ?? x.profile[direction]));
    const before = average(previous.map(x => x.performance[direction] ?? x.profile[direction]));
    const change = before > 0 ? (current - before) / before : 0;
    return { direction, change, plateau: recent.length >= 3 && Math.abs(change) < 0.03 };
  });

  const muscleTotals: Partial<Record<MuscleGroup, number>> = {};
  for (const week of recent) for (const [muscle, xp] of Object.entries(week.muscleXp))
    muscleTotals[muscle as MuscleGroup] = (muscleTotals[muscle as MuscleGroup] ?? 0) + (xp ?? 0);

  const total = Object.values(muscleTotals).reduce((a, b) => a + (b ?? 0), 0) || 1;
  const muscleBalance = (Object.entries(muscleTotals) as [MuscleGroup, number][]).map(([muscle, xp]) => {
    const share = xp / total;
    return { muscle, share, underrepresented: share < 0.05 };
  });

  const completed = recent.reduce((n, x) => n + x.completedSessions, 0);
  const planned = recent.reduce((n, x) => n + x.plannedSessions, 0);
  return { trends, muscleBalance, adherence: planned ? completed / planned : 0 };
}

function average(values: number[]) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}
