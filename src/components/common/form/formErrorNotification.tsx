import { useFormikContext } from "formik";
import { useEffect } from "react";

interface Props {
  debug?: boolean;
  alertError: (msg: string) => void;
}

const FormErrorNotification = ({ debug, alertError }: Props) => {
  const { isValid, isValidating, isSubmitting, errors } = useFormikContext();

  useEffect(() => {
    if (!isValid && !isValidating && isSubmitting) {
      if (debug) {
        console.log(errors);
      }
      alertError("Corrija los errores del formulario");
    }
  }, [isSubmitting, isValid, isValidating]);

  return null;
};

export default FormErrorNotification;
