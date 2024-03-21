import { useId } from "react";

interface Props {
  title: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

const Checkbox = ({
  title,
  disabled,
  required,
  value,
  onChange,
  ...field
}: Props) => {
  const id = useId();

  const classNames = ["text-sm ml-2 text-gray-700 select-none"];
  if (required) {
    classNames.push("after:content-['_*'] after:text-primary-700");
  }

  return (
    <div className="flex gap-1">
      <input
        id={id}
        type="checkbox"
        className="w-4 accent-primary-700 disabled:accent-gray-200"
        {...field}
        checked={value}
        disabled={disabled}
        onChange={onChange}
      />
      <label className={classNames.join(" ")} htmlFor={id}>
        {title}
      </label>
    </div>
  );
};

export default Checkbox;
