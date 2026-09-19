# GYMON Product Spec v0.1

## Core loop
Real training → personal progress → muscle/performance stats → monster XP → moves/evolution → battles → motivation to train again.

## Confirmed design decisions
- Fitness tracker first, game layer second.
- Three bipedal starter families with clearly different silhouettes and evolution trees.
- Voltex and Nimba are current concept starters; third starter remains open.
- No elemental type system.
- Seven evolution stages per long-term path.
- 100+ forms are a long-term target with secret branches.
- Evolution choice is gated by level plus training-derived requirements.
- De-evolution is allowed outside battle. Levels above the previous form cap are sacrificed; they are not refunded as XP.
- Sacrificed progress can grant capped meta tokens used for options such as items/move mastery, never direct paid combat strength.
- Multiple monsters unlock through Trainer Level; each new monster starts its own progression.
- Four equipped moves at a time; learned moves remain available in a move editor.
- Moves unlock through muscle/performance levels and certain evolutions.
- Turn-based battles; priority then speed determines order.
- HP is influenced by conditioning/endurance but battle balance may include other stats.
- PvE first; live/async PvP and guilds later.
- Training plans can be generated, imported or freely logged.
- Generated workouts pre-fill load/reps/sets; users mostly confirm completion and edit deviations.
- Progressive overload adapts future prescriptions.
- Rest/overtraining is informative, not punitive. Excess volume has diminishing/capped rewards to avoid incentivizing unsafe farming.
- Nutrition is outside v0.1.
- No AI coach in v0.1.
- No purchasable combat power.

## Vertical slice acceptance
A user can select Voltex, view a prescribed workout, complete it, receive derived progression, level up, unlock/equip a move, and complete one deterministic PvE battle.
