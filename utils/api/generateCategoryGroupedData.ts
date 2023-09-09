import { Category, SpendEntryWithCategory } from "../../types";
import { exampleSpendEntryWithCategory } from "./exampleData";

// TODO
export default function generateCategoryGroupedData({
  spendsWithCategories,
}: {
  spendsWithCategories: [SpendEntryWithCategory];
}): { [key in Category]: SpendEntryWithCategory[] | [] } {
  return {
    Groceries: [exampleSpendEntryWithCategory("Groceries")],
    Restaurant: [exampleSpendEntryWithCategory("Restaurant")],
    Utilities: [exampleSpendEntryWithCategory("Utilities")],
    Entertainment: [exampleSpendEntryWithCategory("Entertainment")],
    Health: [exampleSpendEntryWithCategory("Health")],
    Travel: [exampleSpendEntryWithCategory("Travel")],
    Shopping: [exampleSpendEntryWithCategory("Shopping")],
    Education: [exampleSpendEntryWithCategory("Education")],
    Transportation: [exampleSpendEntryWithCategory("Transportation")],
    Other: [exampleSpendEntryWithCategory("Other")],
  };
}
