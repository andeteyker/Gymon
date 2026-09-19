# GYMON

**Real training. Real evolution.**

GYMON is a mobile fitness tracker with a creature-RPG progression layer. Real workouts drive monster XP, muscle/performance stats, move unlocks, evolutions and turn-based battles.

## Vertical Slice v0.1

1. Complete onboarding
2. Choose Voltex
3. Receive a generated workout
4. Complete sets with minimal input
5. Convert training progress into muscle/performance progression
6. Gain monster XP and level up
7. Unlock and equip a move
8. Fight a PvE battle

## Product principles

- Training quality and personal progress matter more than raw volume.
- No purchasable combat power.
- One active monster receives progression; more monster slots unlock later.
- De-evolution sacrifices monster levels and grants capped meta-progression tokens, not refunded XP.
- Monsters are fitness archetypes, not elemental types.
- Workout logging should be minimal: suggested sets/reps/load are pre-filled and normally only need confirmation.
- Excess volume has diminishing/capped rewards.

## Stack

React Native + Expo + TypeScript. Local data first; Supabase is planned for auth, persistence and sync.

See [Product Spec](docs/product-spec.md) and [Architecture](docs/architecture.md).
