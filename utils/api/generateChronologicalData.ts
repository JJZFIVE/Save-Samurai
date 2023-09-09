import { Category, SpendEntryWithCategory } from "../../types";
import { exampleSpendEntryWithCategory } from "./exampleData";

// TODO
export default function generateChronologicalData({
  spendsWithCategories,
}: {
  spendsWithCategories: [SpendEntryWithCategory];
}): [SpendEntryWithCategory?] {
  return [exampleSpendEntryWithCategory("Groceries")];
}
