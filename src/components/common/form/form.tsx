import { Formik, Form as FormikForm } from "formik";
import { useRequest } from "@/hooks/useRequest";
import { confirmAlert, errorAlert } from "@/utils/alerts";
import Button from "../button/button";
import FormColumn from "./formColumn";
import FormInput from "./input/formInput";
import FormSelect from "./select/formSelect"; 
import FormSection from "./formSection";
import { useState } from "react";
import Title from "../title/title";
import FormCheckbox from "./checkbox/formCheckbox";
import FormErrorNotification from "./formErrorNotification";
import { ObjectSchema } from "yup";
import { FormContext } from "./formContext";
/* import FormOption from "./select/formOption"; */
import FormButton from "./formButton";
import FormDetail from "./formDetail";

type RequestFn<U> = (value: U) => void | Promise<void>;
type DeleteFn = () => void | Promise<void>;

interface Props<T, U, V> {
  title?: string;
  children: React.ReactNode;
  initialValues: Record<keyof U, any>;
  validationSchema?: ObjectSchema<any>;
  item?: T | null;
  put?: RequestFn<U> | SendRequest<V, U>;
  post?: RequestFn<U> | SendRequest<V, U>;
  del?: DeleteFn | DeleteRequest<T>;
  onChange?: (e: any) => void;
  button?: (props: any, handleSubmit: () => void) => JSX.Element;
  disabled?: boolean;
  debug?: boolean;
  validateBeforeSend?: (values: U) => boolean;
  alertSuccess: (msg:string) => void
  alertError: (msg:string) => void
}

interface SendRequest<V, U> {
  route: string;
  onBody?: (value: U) => Record<string, any> | Record<string, any>[];
  onSuccess: (data: NonNullable<V>) => void;
}

interface DeleteRequest<T> {
  route: string;
  onSuccess: (data: NonNullable<T>) => void;
}

const Form = <T, U, V = T>({
  title,
  children,
  initialValues,
  validationSchema,
  item,
  put,
  post,
  del,
  disabled = false,
  debug,
  button,
  alertSuccess,
  alertError,
  onChange = () => {},
  validateBeforeSend = () => true,
}: Props<T, U, V>) => {

  const { sendRequest } = useRequest();
  const [loading, setLoading] = useState(false);

  const handleSend = async (value: U) => {
    if (!validateBeforeSend(value)) return;
    setLoading(true);
    try {
      if (item) {
        if (put) {
          if (typeof put === "function") {
            await put(value);
          } else {
            if (debug) {
              console.log(put.onBody ? put.onBody(value) : value);
              console.log(
                put.onBody
                  ? JSON.stringify(put.onBody(value))
                  : JSON.stringify(value)
              );
            }
            const res = await sendRequest<NonNullable<V>>(
              put.route,
              put.onBody
                ? put.onBody(value)
                : (value as Record<string, string>),
              {
                method: "PUT",
              }
            );
            if (res) {
              alertSuccess(res.message);
              put.onSuccess(res.data);
            }
          }
        }
      } else {
        if (post) {
          if (typeof post === "function") {
            await post(value);
          } else {
            if (debug) {
              console.log(post.onBody ? post.onBody(value) : value);
              console.log(
                post.onBody
                  ? JSON.stringify(post.onBody(value))
                  : JSON.stringify(value)
              );
            }
            const res = await sendRequest<NonNullable<V>>(
              post.route,
              post.onBody
                ? post.onBody(value)
                : (value as Record<string, string>),
              {
                method: "POST",
              }
            );
            if (res) {
              alertSuccess(res.message);
              post.onSuccess(res.data);
            }
          }
        }
      }
    } catch (e) {
      errorAlert("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (item) {
        if (del) {
          if (typeof del === "function") {
            await del();
          } else {
            const res = await sendRequest(del.route, null, {
              method: "DELETE",
            });
            if (res) {
              alertSuccess(res.message);
              del.onSuccess(item);
            }
          }
        }
      }
    } catch (e) {
      errorAlert("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const buttonProps: any = {
    type: "submit",
    disabled: loading,
  };
  return (
    <FormContext.Provider
      value={{
        initialValues,
        validationSchema,
        disabled: disabled,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSend}
      >
        <FormikForm className="flex flex-col gap-6" onChange={onChange}>
          <FormErrorNotification debug={debug} alertError={alertError} />
          {title && <Title textAlign="center">{title}</Title>}
          <div className="flex gap-6 gap-y-2 flex-wrap justify-center">
            {children}
          </div>
          <div className="self-center flex gap-4">
            {button ? (
              <FormButton button={button} buttonProps={buttonProps} />
            ) : (
              ((post && !item) || (put && item)) && (
                <Button disabled={disabled} {...buttonProps}>
                  Guardar
                </Button>
              )
            )}
            {item && del && (
              <Button
                btnType="secondary"
                type="button"
                disabled={disabled || loading}
                onClick={() => confirmAlert(handleDelete)}
              >
                Eliminar
              </Button>
            )}
          </div>
        </FormikForm>
      </Formik>
    </FormContext.Provider>
  );
};

Form.Column = FormColumn;
Form.Section = FormSection;
Form.Input = FormInput;
Form.Checkbox = FormCheckbox;
Form.Select = FormSelect;
/* Form.Option = FormOption; */
Form.Detail = FormDetail;

export default Form;
