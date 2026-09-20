import { exerciseCatalog } from "../src/data/exerciseCatalog";
import { assertProgressionBalanced } from "../src/domain/progressionBalance";

const report = assertProgressionBalanced(exerciseCatalog);
console.log("Gymon progression balance check passed.");
for (const result of report.results) {
  console.log(`${result.style}: ${result.averageXpPerWeek} XP/week (${result.averageXpPerSession} XP/session)`);
}
console.log(`Cross-style spread: ${Math.round(report.spread * 100)}%`);
