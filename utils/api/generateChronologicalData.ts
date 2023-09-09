import { SpendEntryWithCategory } from "../../types";

export default function generateChronologicalData({
  spendsWithCategories,
}: {
  spendsWithCategories: SpendEntryWithCategory[];
}): SpendEntryWithCategory[] {
  return spendsWithCategories.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
}
