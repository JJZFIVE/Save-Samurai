
// Types below, move to types folder

type Category = string; // Dummy type, replace with your actual Category type.

type SpendEntryWithCategory = {
  // Dummy type, replace with your actual SpendEntryWithCategory type.
  category: Category;
  amount: number;
};

type GlobalProviderProps = {
    children: React.ReactNode;
  };
  
type GenerateInitialReportReturn = {
  categoryGroupedData: {
    [key in Category]: SpendEntryWithCategory[];
  };
  categoryTotalsData: Record<string, number>;
  chronologicalData: SpendEntryWithCategory[];
  savingsByCategory: Record<string, { name: string; amount: number }[]>;
  categorySavingsTotals: Record<string, number>;
  chat: Record<string, any>;
  graphs: Record<string, any>;
};

// Global State Type
type GlobalStateType = {
  darkMode: boolean;
  loading: boolean;
  report: GenerateInitialReportReturn | null;
};



import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext<GlobalStateType | undefined>(undefined);
const GlobalDispatchContext = createContext<((state: Partial<GlobalStateType>) => void) | undefined>(
  undefined
);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, setState] = useState<GlobalStateType>({
    darkMode: false,
    loading: false,
    report: null,
  });

  const setGlobalState = (updatedState: Partial<GlobalStateType>) => {
    setState((prev) => ({ ...prev, ...updatedState }));
  };

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={setGlobalState}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};

export const useSetGlobalState = () => {
  const context = useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error("useSetGlobalState must be used within a GlobalProvider");
  }
  return context;
};
