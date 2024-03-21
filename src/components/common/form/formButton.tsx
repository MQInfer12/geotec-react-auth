import { useFormikContext } from "formik";
interface Props {
  button: (
    props: any,
    handleSubmit: () => void
  ) => JSX.Element;
  buttonProps: any;
}
const FormButton = ({ button, buttonProps }: Props) => {
  const { handleSubmit: formikSubmit } = useFormikContext();

  return button(buttonProps, formikSubmit);
};

export default FormButton;
