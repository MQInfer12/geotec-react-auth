import React, { createContext, useContext } from "react";
import { MultipleValue } from "./formSelect";

interface ContextValue {
  name: string;
  fromOptions: boolean;
  openOptions: boolean;
  setOpenClose: (value: boolean) => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  multiple: boolean;
  multipleValues: MultipleValue[];
  setMultipleValues: React.Dispatch<React.SetStateAction<MultipleValue[]>>;
}

export const FormSelectContext = createContext<ContextValue | null>(null);

export const useFormSelectContext = () => {
  const context = useContext(FormSelectContext);
  if (!context) {
    throw new Error(
      "this contexts must be used whitin a FormSelectContextProvider"
    );
  }
  return context;
};
