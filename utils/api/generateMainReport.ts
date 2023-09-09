import { Category, SpendEntryWithCategory } from "../../types";
import { formatTransactionForGPT } from "../formatting";
import { openai } from "../openai";

export default async function generateMainReport({
  categoryGroupedData,
  categoryTotalsData,
  chronologicalData,
  savingsByCategory,
  categorySavingsTotals,
}: {
  categoryGroupedData: { [key in Category]: SpendEntryWithCategory[] | [] };
  categoryTotalsData: {
    [key in Category]: number;
  };
  chronologicalData: SpendEntryWithCategory[] | [];
  savingsByCategory: {
    [key in Category]: SpendEntryWithCategory[] | [];
  };
  categorySavingsTotals: {
    [key in Category]: number;
  };
}): Promise<string> {
  const prompt = formatMainReportPrompt({
    categoryGroupedData,
    categoryTotalsData,
    chronologicalData,
    savingsByCategory,
    categorySavingsTotals,
  });

  console.log("main report PROMPT: ", prompt.length, prompt);

  // feed into openai
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  console.log("main report response: ", completion.choices[0].message.content);

  return "Example report";
}

const formatMainReportPrompt = ({
  categoryGroupedData,
  categoryTotalsData,
  chronologicalData,
  savingsByCategory,
  categorySavingsTotals,
}: {
  categoryGroupedData: { [key in Category]: SpendEntryWithCategory[] | [] };
  categoryTotalsData: {
    [key in Category]: number;
  };
  chronologicalData: SpendEntryWithCategory[] | [];
  savingsByCategory: {
    [key in Category]: SpendEntryWithCategory[] | [];
  };
  categorySavingsTotals: {
    [key in Category]: number;
  };
}): string => {
  const presentSavingsByCategory = Object.keys(savingsByCategory).reduce(
    (result, key) => {
      // Check if the value associated with the key is an array and not empty
      if (
        Array.isArray(savingsByCategory[key as Category]) &&
        savingsByCategory[key as Category].length > 0
      ) {
        // If it's a non-empty array, add it to the result object
        // @ts-ignore
        result[key] = savingsByCategory[key as Category];
      }
      return result;
    },
    {}
  );

  const prompt = `You are SaveSamurai, my helpful financial assistant. You are generating a report on my credit card transaction history, with an emphasis on areas where I can save money and cut back on extraneous spending. Below is a list of credit card transactions:

${chronologicalData.map((transaction, i) =>
  formatTransactionForGPT({ i, transaction })
)}

Here is a JSON object of already computed transactions that are extraneous and can be removed. Summarize these to me and offer cheaper alternatives to these if possible:

${JSON.stringify(presentSavingsByCategory)}

Here are the totals spent by category:

${JSON.stringify(categoryTotalsData)}

Here are the totals by category of how much the user will save if they remove all of the above savings:

${JSON.stringify(categorySavingsTotals)}

Using all of this information, generate me a report in the tone of a financial advisor.`;

  return prompt;
};
