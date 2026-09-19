import { WorkoutSession } from "@/domain/types";

export interface WorkoutSessionRepository {
  save(session: WorkoutSession): Promise<void>;
  getById(id: string): Promise<WorkoutSession | null>;
  list(): Promise<WorkoutSession[]>;
}

export class InMemoryWorkoutSessionRepository implements WorkoutSessionRepository {
  private sessions = new Map<string, WorkoutSession>();

  async save(session: WorkoutSession) {
    this.sessions.set(session.id, cloneSession(session));
  }

  async getById(id: string) {
    const session = this.sessions.get(id);
    return session ? cloneSession(session) : null;
  }

  async list() {
    return [...this.sessions.values()]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(cloneSession);
  }
}

function cloneSession(session: WorkoutSession): WorkoutSession {
  return {
    ...session,
    exercises: session.exercises.map(exercise => ({
      ...exercise,
      sets: exercise.sets.map(set => ({ ...set })),
    })),
  };
}

// Single app-level instance for the MVP. Replace this adapter with durable
// local storage/Supabase without changing the training or progression domains.
export const workoutSessionRepository: WorkoutSessionRepository =
  new InMemoryWorkoutSessionRepository();
