import { SpendEntry, SpendEntryWithCategory } from "../../types";
import { exampleSpendEntryWithCategory } from "./exampleData";

// TODO
export default async function categorizerProcessor({
  rawSpendEntries,
}: {
  rawSpendEntries: [SpendEntry];
}): Promise<[SpendEntryWithCategory]> {
  // rawSpendEntries are guaranteed to have length

  const prompt = formatCategorizerProcessorPrompt({ rawSpendEntries });

  // feed into openai

  return [exampleSpendEntryWithCategory("Groceries")];
}

const formatCategorizerProcessorPrompt = ({
  rawSpendEntries,
}: {
  rawSpendEntries: [SpendEntry];
}): string => {
  const prompt = ``;

  return prompt;
};
