import { Field } from "formik";
import { useFormContext, useRequiredField } from "../formContext";
import { useCondition } from "../hooks/useCondition";
import Input from "../../inputs/input";

interface Props {
  title: string;
  name: string;
  condition?: (values: any) => boolean;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  noAutoComplete?: boolean;
}

const FormInput = ({
  title,
  placeholder,
  name,
  type,
  error,
  condition,
  disabled = false,
  noAutoComplete,
}: Props) => {
  const required = useRequiredField(name);
  const appear = useCondition(name, condition);
  const { disabled: formDisabled } = useFormContext();
  if (appear) return null;
  return (
    <Field name={name}>
      {({ field, meta }: any) => {
        return (
          <Input
            {...field}
            title={title}
            disabled={formDisabled || disabled}
            placeholder={placeholder}
            required={required}
            type={type}
            error={error || (meta.touched && meta.error)}
            noAutoComplete={noAutoComplete}
          />
        );
      }}
    </Field>
  );
};

export default FormInput;
