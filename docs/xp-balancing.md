# Gymon XP Balancing

Gymon rewards productive training rather than absolute strength.

## Principles

- Absolute kilograms do not directly create more Gymon XP.
- Personal improvement is capped so a single anomalous session cannot dominate progression.
- Completion, quality and trust modify rewards.
- Strength, bodyweight, cardio and other exercise categories share the same normalized reward pipeline.
- Productive session duration influences the ceiling, not raw minute-by-minute farming.
- Repeating the same exercise excessively within a reward window has diminishing returns.
- Every session has a soft progression cap based on productive duration.
- Muscle XP is distributed after balanced exercise XP is calculated.

## Anti-farming

Repeated rewards for the same exercise use diminishing multipliers:

1st/2nd reward: 100%
3rd: 70%
4th: 45%
Further rewards: 20%

The session cap scales from a short productive session toward longer sessions but stops scaling aggressively after normal workout duration. This prevents endless low-effort sets or very long sessions from producing unlimited progression.

## Calibration

The constants in this module are initial gameplay values, not physiological claims. They should be tuned with simulated users and real beta telemetry so that different legitimate training styles achieve comparable long-term Gymon progression when adherence and personal improvement are similar.
