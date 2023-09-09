import { Category, SpendEntryWithCategory } from "../../types";
import { exampleSpendEntryWithCategory } from "./exampleData";

// TODO
export default async function generateMainReport({
  categoryGroupedData,
  categoryTotalsData,
  chronologicalData,
  savingsByCategory,
  categorySavingsTotals,
}: {
  categoryGroupedData: { [key in Category]: [SpendEntryWithCategory?] };
  categoryTotalsData: {
    [key in Category]: number;
  };
  chronologicalData: [SpendEntryWithCategory?];
  savingsByCategory: {
    [key in Category]: [SpendEntryWithCategory?];
  };
  categorySavingsTotals: {
    [key in Category]: number;
  };
}): Promise<string> {
  // format prompt into savings processor

  // feed into openai

  return "Example report";
}
