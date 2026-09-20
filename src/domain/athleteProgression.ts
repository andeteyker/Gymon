import { MuscleGroup } from "./types";
import { TrainingProfile } from "./trainingProfile";

export interface AthleteProgression {
  profile: TrainingProfile;
  performance: {
    strength: number;
    endurance: number;
    power: number;
    consistency: number;
  };
  muscleTrainingLoad: Partial<Record<MuscleGroup, number>>;
  completedSessions: number;
  personalRecords: Record<string, number>;
}

export function createAthleteProgression(profile: TrainingProfile): AthleteProgression {
  return {
    profile,
    performance: { strength: 0, endurance: 0, power: 0, consistency: 0 },
    muscleTrainingLoad: {},
    completedSessions: 0,
    personalRecords: {},
  };
}
