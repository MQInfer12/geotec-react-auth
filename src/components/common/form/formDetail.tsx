import { useFormikContext } from "formik";
import React from "react";

interface Props {
  children: (values: any) => React.ReactNode;
  condition?: (values: any) => boolean;
}

const Render = ({ children }: { children: React.ReactNode }) => {
  return <small className="px-2 opacity-80">{children}</small>;
};

const FormDetail = ({ children, condition }: Props) => {
  const { values } = useFormikContext();
  if (!condition) {
    return <Render children={children(values)} />;
  }
  if (condition(values)) {
    return <Render children={children(values)} />;
  }
};

export default FormDetail;
