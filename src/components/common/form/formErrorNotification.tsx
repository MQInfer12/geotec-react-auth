import { useFormikContext } from "formik";
import { useEffect } from "react";
import { alertError } from "../../../utils/alertsToast";

interface Props {
  debug?: boolean;
}

const FormErrorNotification = ({ debug }: Props) => {
  const { isValid, isValidating, isSubmitting, errors } = useFormikContext();

  useEffect(() => {
    if (!isValid && !isValidating && isSubmitting) {
      if (debug) {
        console.log(errors);
      }
      alertError("Corrije los errores del formulario");
    }
  }, [isSubmitting, isValid, isValidating]);

  return null;
};

export default FormErrorNotification;
