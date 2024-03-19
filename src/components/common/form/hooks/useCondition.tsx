import { useFormikContext } from "formik";
import { useEffect } from "react";

export const useCondition = (
  name: string,
  condition?: (values: any) => boolean
) => {
  const { values, setFieldValue } = useFormikContext();

  const evalCondition = (condition && !condition(values)) || false;
  useEffect(() => {
    if (evalCondition) {
      setFieldValue(name, "");
    }
    //@ts-ignore
  }, [values[name], evalCondition]);

  return evalCondition;
};
