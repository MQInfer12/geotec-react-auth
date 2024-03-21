import { createContext, useContext } from "react";
import { ObjectSchema } from "yup";

interface ContextValue {
  initialValues: Record<any, any>;
  validationSchema?: ObjectSchema<any>;
  disabled: boolean;
}

export const FormContext = createContext<ContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("this contexts must be used whitin a FormContextProvider");
  }
  return context;
};

export const useRequiredField = (name: string) => {
  const { validationSchema } = useFormContext();

  const fields = validationSchema?.describe().fields;
  const fieldRequired = Object.entries(fields || []).find(
    ([key]) => key === name
  )?.[1];
  //@ts-ignore
  const required = fieldRequired ? !fieldRequired.optional : false;

  return required;
};
