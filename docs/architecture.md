# Architecture

## Layers
1. **UI (Expo Router)** — screens and interaction.
2. **Training domain** — exercises, sets, workout plans and progressive overload.
3. **Progression domain** — personal baseline/history, plausibility, normalized progress, XP, Trainer Level and tokens.
4. **Gymon domain** — stats, moves and evolution graph.
5. **Battle domain** — deterministic turn resolution independent of workout calculations.
6. **Entitlements** — Free/Gymon+ feature access without affecting core progression or combat strength.
7. **Persistence** — local-first MVP; Supabase planned for auth, persistence and sync.

## Domain boundaries
The battle engine consumes normalized Gymon combat stats. It must not know how a bench press or running session is calculated.

The training engine owns progressive overload and dynamic workout adaptation. These are core/free features and must not depend on a premium entitlement.

Automatic training-plan generation is a separate planning service behind the Gymon+ entitlement. A generated plan becomes a normal workout plan after creation, so subsequent progression/adaptation uses the same free training engine.

The progression engine must derive rewards from personal history and productive training rather than absolute weight. Plausibility/trust metadata is calculated separately from the user's raw workout log so suspicious data can be retained without granting unrestricted progression.

## Planned persistence entities
users, goals, subscriptions, entitlements, gymons, gymon_stats, exercises, workout_plans, workout_sessions, workout_sets, progression_events, workout_trust, moves, gymon_moves, evolutions, evolution_edges, battles.

## Suggested domain modules
- training: prescription, completion, overload/adaptation
- progression: baseline, scoring, plausibility, XP
- gymon: forms, levels, evolution, moves
- battle: combat state and turn resolution
- planning: manual/imported plans + Gymon+ automatic plan generation
- entitlements: feature gates only

## Engineering order
1. Workout completion and persistence abstraction
2. Personal baseline/history model
3. Relative progression + plausibility scoring
4. Dynamic next-workout adaptation
5. XP curve, level caps and muscle-level conversion
6. Voltex Stage I/II + first move unlock
7. Onboarding/starter selection
8. PvE opponent + battle screen
9. Gymon+ entitlement boundary and automatic plan-generation interface
