import { Category, SpendEntryWithCategory } from "../../types";
import { exampleSpendEntryWithCategory } from "./exampleData";

// TODO
export default async function savingsProcessor({
  categoryGroupedData,
}: {
  categoryGroupedData: { [key in Category]: SpendEntryWithCategory[] | [] };
}): Promise<{ [key in Category]: SpendEntryWithCategory[] | [] }> {
  // format prompt into savings processor

  // feed into openai

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
