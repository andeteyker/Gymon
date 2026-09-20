# Athlete and Gymon Progression

Gymon deliberately keeps real athlete development separate from game progression.

## Athlete progression

Represents the user's real training development. It stores training profile, performance trends, muscle training load, completed sessions and personal records. These values drive workout analysis and adaptive training plans. Athlete progression is not a spendable or game-level XP economy.

## Gymon progression

Represents the game layer. Productive workouts are converted into balanced Gymon XP and Gymon muscle XP. These values drive Gymon level, muscle levels, move unlocks and evolution requirements.

## Relationship

A completed workout produces two outputs:

1. Training evidence updates Athlete Progression.
2. The reward engine derives a bounded game reward that updates Gymon Progression.

The athlete's training profile may influence available Gymon builds and evolution directions, but athlete performance values must never be treated as Gymon XP directly. Likewise, Gymon level must never be used as evidence of real-world athletic ability.
