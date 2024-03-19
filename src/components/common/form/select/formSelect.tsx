import React, { useEffect, useId, useState } from "react";
import { useFormikContext } from "formik";
import { useGet } from "@/hooks/useGet";
import { useFormContext, useRequiredField } from "../formContext";
import FormOption from "./formOption";
import { FormSelectContext } from "./formSelectContext";
import OutsideAlerter from "../../utils/outsideAlerter";
import FormInputError from "../formInputError";
import { useCondition } from "../hooks/useCondition";
import FormOptionContainer from "./formOptionContainer";
import SelectComponent from "./select";
import { autoUpdate, size, useFloating } from "@floating-ui/react";

export type MultipleValue = {
  value: string;
  parent?: string;
};

type FromOptions = {
  title: string;
  name: string;
  placeholder?: string;
  pills?: boolean;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  alwaysShow?: boolean;
  onChange?: (value: any) => void;
  condition?: (values: any) => boolean;
  children?: React.ReactNode;
};

type FromBackend<T> = {
  title: string;
  name: string;
  placeholder: string;
  pills?: boolean;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  alwaysShow?: boolean;
  onChange?: (value: any) => void;
  condition?: (values: any) => boolean;
  route: string;
  optionValueKey: keyof T;
} & TextOption<T>;

type TextOption<T> =
  | {
      optionTextKey: keyof T;
    }
  | {
      optionTextFn: (value: T) => string;
    };

type Props<T> = FromOptions | FromBackend<T>;

const FormSelect = <T,>({
  title,
  searchable = false,
  name,
  error,
  disabled,
  condition,
  alwaysShow,
  onChange,
  ...props
}: Props<T>) => {
  const id = useId();
  const containerId = useId();
  //@ts-ignore
  const cId = containerId.replaceAll(":", "_");
  const required = useRequiredField(name);
  const fromOptions = "children" in props;
  //@ts-ignore
  const { res } = useGet<T[]>(!fromOptions ? props.route : "", {
    send: !fromOptions,
  });
  const { values, setFieldValue } = useFormikContext();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  const appear = useCondition(name, condition);
  const { disabled: formDisabled } = useFormContext();

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    open: open,
    whileElementsMounted: autoUpdate,
    middleware: [
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  //@ts-ignore
  const actualValue = values[name];
  const multiple = Array.isArray(actualValue);
  const [multipleValues, setMultipleValues] = useState<MultipleValue[]>(
    multiple
      ? actualValue.map((v) => ({
          value: v,
          text: "",
        }))
      : []
  );

  const classNames = ["text-sm ml-2 font-semibold text-gray-700"];
  if (required) {
    classNames.push("after:content-['_*'] after:text-primary-700");
  }

  useEffect(() => {
    if (formDisabled || disabled) {
      setOpen(false);
    }
  }, [formDisabled, disabled]);

  useEffect(() => {
    if (res && !fromOptions) {
      //@ts-ignore
      const key = props.optionValueKey;
      if (multiple) {
        const actualValues: MultipleValue[] = res.data
          //@ts-ignore
          .filter((v) => actualValue.includes(v[key]))
          .map((v) => ({
            //@ts-ignore
            value: v[key] as string,
          }));
        setMultipleValues(actualValues);
      } else {
        //@ts-ignore
        const selected = res.data.find((value) => value[key] === actualValue);
        if (selected) {
          const text =
            "optionTextKey" in props
              ? (selected[props.optionTextKey] as string)
              : //@ts-ignore
                props.optionTextFn(selected);
          setText(text);
        }
      }
    }
  }, [res]);

  const setOpenClose = (value: boolean) => {
    if (value) {
      setOpen(true);
    } else {
      setOpen(false);
      setFilter("");
    }
  };

  useEffect(() => {
    if (multiple) {
      setFieldValue(
        name,
        multipleValues.map((v) => v.value)
      );
    }
  }, [multipleValues]);

  useEffect(() => {
    if (onChange) {
      onChange(actualValue);
    }
  }, [actualValue]);

  if (appear) return null;
  //@ts-ignore
  const value = text || props.placeholder;
  const openOptions = !!((open && !formDisabled && !disabled) || alwaysShow);
  return (
    <FormSelectContext.Provider
      value={{
        name,
        fromOptions,
        openOptions,
        setOpenClose,
        setText,
        filter,
        multiple,
        multipleValues,
        setMultipleValues,
      }}
    >
      <OutsideAlerter
        exceptElement={cId}
        maxHeight={alwaysShow ? undefined : "64px"}
        full
        onEvent={() => setOpenClose(false)}
      >
        <div ref={refs.setReference} className="flex flex-col flex-1 gap-1">
          <label className={classNames.join(" ")} htmlFor={id}>
            {title}
          </label>
          <div className="relative flex flex-col">
            {!alwaysShow && (
              <SelectComponent
                disabled={formDisabled || disabled}
                id={id}
                multiple={multiple}
                multipleValues={multipleValues}
                open={open}
                props={props}
                setOpenClose={setOpenClose}
                value={value}
              />
            )}
            <FormOptionContainer
              containerId={cId}
              open={openOptions}
              alwaysShow={alwaysShow}
              error={error}
              searchable={searchable}
              filter={filter}
              setFilter={setFilter}
              floatingStyles={floatingStyles}
              setFloatingRef={refs.setFloating}
            >
              {!!actualValue &&
                props.placeholder &&
                !alwaysShow &&
                !multiple && (
                  <FormOption value="">{props.placeholder}</FormOption>
                )}
              {fromOptions ? (
                props.children
              ) : (
                <>
                  {!res ? (
                    <FormOption disabled value="">
                      Cargando...
                    </FormOption>
                  ) : res.data.length > 0 ? (
                    res?.data.map((item) => (
                      <FormOption
                        //@ts-ignore
                        key={item[props.optionValueKey] as string}
                        //@ts-ignore
                        value={item[props.optionValueKey] as string}
                      >
                        {"optionTextKey" in props
                          ? (item[props.optionTextKey] as string)
                          : //@ts-ignore
                            props.optionTextFn(item)}
                      </FormOption>
                    ))
                  ) : (
                    <FormOption disabled value="">
                      No existen datos
                    </FormOption>
                  )}
                </>
              )}
            </FormOptionContainer>
            <FormInputError name={name} error={error} />
          </div>
        </div>
      </OutsideAlerter>
    </FormSelectContext.Provider>
  );
};

export default FormSelect;
