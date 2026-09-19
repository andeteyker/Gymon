# Architecture

## Layers
1. **UI (Expo Router)** — screens and interaction.
2. **Training domain** — exercises, sets, workout plans, progressive overload.
3. **Progression domain** — personal improvement, stimulus, XP, Trainer Level and tokens.
4. **Monster domain** — stats, moves and evolution graph.
5. **Battle domain** — deterministic turn resolution independent of workout calculations.
6. **Persistence** — local mocks first; Supabase later.

## Rule
The battle engine consumes normalized monster combat stats. It must not know how a bench press or running session is calculated. This keeps fitness calibration independent from combat balancing.

## Planned persistence entities
users, goals, monsters, monster_stats, exercises, workout_plans, workout_sessions, workout_sets, moves, monster_moves, evolutions, evolution_edges, battles.

## Next engineering tasks
- Workout completion state
- Personal baseline/history model
- Relative progression scoring
- XP curve and level caps
- Muscle-level conversion
- Voltex Stage I/II definitions
- First move unlock
- PvE opponent and battle screen
