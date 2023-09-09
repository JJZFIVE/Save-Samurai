// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  GenerateInitialReportInput,
  GenerateInitialReportReturn,
  SpendEntryWithCategory,
} from "../../types";
import categorizerProcessor from "../../utils/api/categorizerProcessor";
import generateCategoryGroupedData from "../../utils/api/generateCategoryGroupedData";
import generateCategoryTotalsData from "../../utils/api/generateCategoryTotalsData";
import savingsProcessor from "../../utils/api/savingProcessor";
import generateCategorySavingsTotals from "../../utils/api/generateCategorySavingsTotals";
import generateChronologicalData from "../../utils/api/generateChronologicalData";
import generateMainReport from "../../utils/api/generateMainReport";

// categoryGroupedData: {}; // all data grouped by category. key: category
// categoryTotalsData: {}; // total amounts by category
// chronologicalData: []; // all data sorted in chronological order
// savingsByCategory: {}; // key: category, obj: result of savings processor which is a [{name, amount},...]
// categorySavingsTotals: {}; // key: category, amount: total amount of saving for that category
// chat: {}; // the initial report generated by the chat
// graphs: {}; // graph data

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateInitialReportReturn>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const inputData = req.body as GenerateInitialReportInput;
    if (!inputData || !inputData.rawData || !inputData?.rawData?.length)
      throw new Error("No input data");

    const rawSpendEntries = inputData.rawData;

    // check integrity of the data, like in the right format

    const spendsWithCategories: [SpendEntryWithCategory] =
      await categorizerProcessor({ rawSpendEntries });

    // Group all of the data and store in object called categoryGroupedData
    // Done, haven't tested
    const categoryGroupedData = generateCategoryGroupedData({
      spendsWithCategories,
    });

    // Calclate totals of categoryGroupedData and store in categoryTotalsData
    // Done, did not test yet
    const categoryTotalsData = generateCategoryTotalsData({
      categoryGroupedData,
    });

    // TODO: Sort by chronological order
    const chronologicalData = generateChronologicalData({
      spendsWithCategories,
    });

    // TODO: Run through savingsProcessor on categoryGroupedData, save in savingsByCategory
    const savingsByCategory = await savingsProcessor({ categoryGroupedData });

    // Calculate categorySavingsTotals from savingsByCategory
    // Done, did not test yet
    const categorySavingsTotals = generateCategorySavingsTotals({
      savingsByCategory,
    });

    // TODO: Run all through giant GPT prompt to generate the report
    const report = await generateMainReport({
      categoryGroupedData,
      categoryTotalsData,
      chronologicalData,
      savingsByCategory,
      categorySavingsTotals,
    });

    // TODO: Format data for graphs if necessary
    // graph formatting code

    return res.status(200).json({
      categoryGroupedData,
      categoryTotalsData,
      chronologicalData,
      savingsByCategory,
      categorySavingsTotals,
      chat: {
        report,
      },
      graphs: {},
    });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return res.status(400).json({
      categoryGroupedData: {
        Groceries: [],
        Restaurant: [],
        Utilities: [],
        Entertainment: [],
        Health: [],
        Travel: [],
        Shopping: [],
        Education: [],
        Transportation: [],
        Other: [],
      },
      categoryTotalsData: {
        Groceries: 0,
        Restaurant: 0,
        Utilities: 0,
        Entertainment: 0,
        Health: 0,
        Travel: 0,
        Shopping: 0,
        Education: 0,
        Transportation: 0,
        Other: 0,
      },
      chronologicalData: [],
      savingsByCategory: {
        Groceries: [],
        Restaurant: [],
        Utilities: [],
        Entertainment: [],
        Health: [],
        Travel: [],
        Shopping: [],
        Education: [],
        Transportation: [],
        Other: [],
      },
      categorySavingsTotals: {
        Groceries: 0,
        Restaurant: 0,
        Utilities: 0,
        Entertainment: 0,
        Health: 0,
        Travel: 0,
        Shopping: 0,
        Education: 0,
        Transportation: 0,
        Other: 0,
      },
      chat: {
        report: "",
      },
      graphs: {},
      error: {
        valid: true,
        message: "Invalid request body",
      },
    });
  }
}
