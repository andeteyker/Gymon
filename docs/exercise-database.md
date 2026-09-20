# Gymon Exercise Database

## Source strategy
Gymon keeps its own normalized catalog. Open datasets are reference/import sources, not the gameplay reward model.

Initial sources evaluated:
- Kinetic Exercises Database: MIT, 899 exercises, structured muscle/equipment relations.
- yuhonas/free-exercise-db: 800+ public-domain exercise records.

Do not import third-party exercise images until their individual commercial-use rights are verified.

## Data model
Each exercise stores category, tracking mode, required equipment, normalized Gymon muscle shares, progression method and a small base-effort coefficient.

Absolute kilograms never directly determine Gymon XP. Reward calculation uses completion, personal improvement, quality and trust. Muscle XP is then distributed using normalized muscle shares.

## Training places
A training place is an equipment inventory. The available exercise set is derived automatically by checking whether all equipment required by an exercise exists at the place.

Built-in place templates: Commercial Gym, Home, Outdoor, Calisthenics Park. Custom places use the same model.

## Import pipeline
1. Import open-source exercise metadata.
2. Normalize source muscle names into Gymon's 10 muscle groups.
3. Normalize equipment into Gymon's equipment taxonomy.
4. Merge aliases/variants and deduplicate.
5. Assign tracking/progression modes.
6. Review muscle shares and base-effort coefficients.
7. Validate shares sum to 1.0.
8. Publish only reviewed exercises into the gameplay catalog.

The current TypeScript seed is intentionally small; it establishes the schema before bulk-importing hundreds of records.
