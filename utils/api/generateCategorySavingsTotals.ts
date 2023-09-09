import { Category, SpendEntryWithCategory } from "../../types";
import { exampleSpendEntryWithCategory } from "./exampleData";

// TODO
export default function generateCategorySavingsTotals({
  savingsByCategory,
}: {
  savingsByCategory: { [key in Category]: [SpendEntryWithCategory?] };
}): { [key in Category]: number } {
  return {
    Groceries: 69.42,
    Restaurant: 69.42,
    Utilities: 69.42,
    Entertainment: 69.42,
    Health: 69.42,
    Travel: 69.42,
    Shopping: 69.42,
    Education: 69.42,
    Transportation: 69.42,
    Other: 69.42,
  };
}
