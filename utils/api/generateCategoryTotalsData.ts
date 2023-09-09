import { Category, SpendEntryWithCategory } from "../../types";
import { exampleSpendEntryWithCategory } from "./exampleData";

// TODO
export default function generateCategoryTotalsData({
  categoryGroupedData,
}: {
  categoryGroupedData: { [key in Category]: [SpendEntryWithCategory?] };
}): { [key in Category]: number } {
  return {
    Groceries: 140.23,
    Restaurant: 140.23,
    Utilities: 140.23,
    Entertainment: 140.23,
    Health: 140.23,
    Travel: 140.23,
    Shopping: 140.23,
    Education: 140.23,
    Transportation: 140.23,
    Other: 140.23,
  };
}
