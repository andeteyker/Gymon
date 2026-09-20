import { ExerciseCatalogEntry } from "./exerciseCatalog";
import { compareTrainingStyles, SimulationResult } from "./progressionSimulation";

export interface BalanceReport {
  results: SimulationResult[];
  lowestXpPerWeek: number;
  highestXpPerWeek: number;
  spread: number;
  balanced: boolean;
}

export function progressionBalanceReport(
  catalog: ExerciseCatalogEntry[],
  weeks = 12,
  maxSpread = 0.25
): BalanceReport {
  const results = compareTrainingStyles(catalog, weeks);
  const values = results.map(x => x.averageXpPerWeek);
  const lowestXpPerWeek = Math.min(...values);
  const highestXpPerWeek = Math.max(...values);
  const midpoint = (lowestXpPerWeek + highestXpPerWeek) / 2 || 1;
  const spread = (highestXpPerWeek - lowestXpPerWeek) / midpoint;
  return { results, lowestXpPerWeek, highestXpPerWeek, spread, balanced: spread <= maxSpread };
}

export function assertProgressionBalanced(
  catalog: ExerciseCatalogEntry[],
  weeks = 12,
  maxSpread = 0.25
) {
  const report = progressionBalanceReport(catalog, weeks, maxSpread);
  if (!report.balanced) {
    const detail = report.results.map(x => `${x.style}: ${x.averageXpPerWeek} XP/week`).join(", ");
    throw new Error(`Progression balance spread ${Math.round(report.spread * 100)}% exceeds ${Math.round(maxSpread * 100)}%. ${detail}`);
  }
  return report;
}
