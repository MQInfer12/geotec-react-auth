import { Field } from "formik";
import { useFormContext, useRequiredField } from "../formContext";
import Checkbox from "../../inputs/checkbox";

interface Props {
  title: string;
  name: string;
  disabled?: boolean;
}

const FormCheckbox = ({ title, name, disabled = false }: Props) => {
  const required = useRequiredField(name);
  const { disabled: formDisabled } = useFormContext();

  const classNames = ["text-sm ml-2 text-gray-700 select-none"];
  if (required) {
    classNames.push("after:content-['_*'] after:text-primary-700");
  }

  return (
    <Field name={name}>
      {({ field }: any) => (
        <div className="ml-2">
        <Checkbox
          {...field}
          title={title}
          disabled={formDisabled || disabled}
          required={required}
        />
        </div>
      )}
    </Field>
  );
};

export default FormCheckbox;
