// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// categoryGroupedData: {}; // all data grouped by category. key: category
// categoryTotalsData: {}; // total amounts by category
// chronologicalData: []; // all data sorted in chronological order
// savingsByCategory: {}; // key: category, obj: result of savings processor which is a [{name, amount},...]
// categorySavingsTotals: {}; // key: category, amount: total amount of saving for that category
// chat: {}; // the initial report generated by the chat
// graphs: {}; // graph data

type Category =
  | "Groceries"
  | "Restaurant"
  | "Utilities"
  | "Entertainment"
  | "Health"
  | "Travel"
  | "Shopping"
  | "Education"
  | "Transportation"
  | "Other";
type SpendEntry = { title: string; amount: number; date: Date };
type SpendEntryWithCategory = SpendEntry & { category: Category };

type GenerateInitialReportInput = {
  rawData: [SpendEntry]; // the raw parsed csv data
};

type GenerateInitialReportReturn = {
  categoryGroupedData: {
    [key in Category]: [SpendEntryWithCategory?];
  };
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
  chat: {
    report: string;
  };
  graphs: {};
  error?: {
    valid: boolean;
    message: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateInitialReportReturn>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const inputData = req.body as GenerateInitialReportInput;

    // check integrity of the data, like in the right format

    const exampleSpendEntry = {
      title: "test",
      amount: 69.42,
      date: new Date(),
    };
    const exampleSpendEntryWithCategory = (category: Category) => {
      const ret: SpendEntryWithCategory = { ...exampleSpendEntry, category };
      return ret;
    };

    return res.status(200).json({
      categoryGroupedData: {
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
      },
      categoryTotalsData: {
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
      },
      chronologicalData: [exampleSpendEntryWithCategory("Groceries")],
      savingsByCategory: {
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
      },
      categorySavingsTotals: {
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
      },
      chat: {
        report: "Example report",
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
