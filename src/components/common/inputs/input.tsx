import { useId } from "react";
import InputError from "./inputError";

interface Props {
  title?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  noAutoComplete?: boolean;
  icon?: JSX.Element;
  minWidth?: string;
  size?: "base" | "small";
}
const Input = ({
  title,
  placeholder,
  required,
  type,
  error,
  disabled = false,
  value,
  onChange,
  noAutoComplete,
  icon,
  minWidth = "320px",
  size = "base",
  ...field
}: Props) => {
  const id = useId();

  const classNames = ["text-sm ml-2 font-semibold text-gray-700"];
  if (required) {
    classNames.push("after:content-['_*'] after:text-primary-700");
  }

  const stylesInput = [
    "w-full px-2 pr-10 text-sm border outline-none border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 bg-white disabled:bg-gray-100",
  ];
  switch (size) {
    case "base":
      stylesInput.push("py-2");
      break;
    case "small":
      stylesInput.push("py-1");
      break;
  }
  if (icon) {
    stylesInput.push("pr-1 pl-6");
  }

  return (
    <div className="flex flex-col flex-1 gap-1 max-h-16">
      {title && (
        <label className={classNames.join(" ")} htmlFor={id}>
          {title}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="h-full aspect-square absolute top-1/2 -translate-y-1/2 p-2 text-gray-600">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={stylesInput.join(" ")}
          style={{
            minWidth,
          }}
          value={value}
          onChange={onChange}
          autoComplete={noAutoComplete ? "false" : undefined}
          {...field}
          type={type || "text"}
          placeholder={
            placeholder ||
            (title ? `Ingrese ${title?.toLocaleLowerCase()}` : undefined)
          }
          disabled={disabled}
        />
        <InputError error={error} />
      </div>
    </div>
  );
};

export default Input;
