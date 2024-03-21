import { useFormikContext } from "formik";
import { useFormSelectContext } from "./formSelectContext";
import { MultipleValue } from "./formSelect";
import { useEffect } from "react";

interface Props {
  value: string;
  children: string;
  tab?: number;
  disabled?: boolean;
}

const FormOption = ({ children, value, disabled = false, tab = 0 }: Props) => {
  const {
    name,
    setOpenClose,
    setText,
    filter,
    multiple,
    multipleValues,
    setMultipleValues,
    fromOptions,
    openOptions,
  } = useFormSelectContext();
  const { values, setFieldValue } = useFormikContext();

  const handleChange = () => {
    if (multiple) {
      const exists = multipleValues.some((v) => v.value === value);
      let newValue: MultipleValue[] = [];
      if (exists) {
        newValue = multipleValues.filter((v) => v.value !== value);
      } else {
        newValue = [
          ...multipleValues,
          {
            value: value,
          },
        ];
      }
      setMultipleValues(newValue);
    } else {
      setText(children);
      setFieldValue(name, value);
      setOpenClose(false);
    }
  };

  if (!children.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    return null;

  //@ts-ignore
  const v = values[name];
  const selected = !multiple && v === value;

  useEffect(() => {
    if (selected && fromOptions) {
      setText(children);
    }
  }, []);

  const classNames = [
    "text-black/80 pr-2 py-2 outline-none cursor-pointer disabled:bg-gray-100 disabled:text-black/40 disabled:cursor-auto flex gap-2",
  ];
  if (selected) {
    classNames.push("bg-primary-500");
  } else {
    classNames.push("hover:bg-gray-100 focus:bg-gray-100");
  }
  const PClassNames = [
    "text-start text-[12px] text-ellipsis overflow-hidden whitespace-nowrap",
  ];
  if (selected) {
    classNames.push("text-white");
  } else {
    classNames.push("text-black/80");
  }

  return (
    <button
      type="button"
      className={classNames.join(" ")}
      style={{
        paddingLeft: `${tab * 12 + 8}px`,
      }}
      onClick={handleChange}
      disabled={disabled}
      tabIndex={!openOptions ? -1 : undefined}
    >
      {multiple && (
        <input
          type="checkbox"
          checked={multipleValues.some((v) => v.value === value)}
          readOnly
          className="accent-primary-700 pointer-events-none"
        />
      )}
      <p className={PClassNames.join(" ")}>{children}</p>
    </button>
  );
};

export default FormOption;
