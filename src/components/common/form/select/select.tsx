import IconUp from "@assets/icons/iconUp";
import { MultipleValue } from "./formSelect";
import IconDown from "@assets/icons/iconDown";

interface Props {
  id: string;
  disabled: boolean | undefined;
  setOpenClose: (value: boolean) => void;
  multiple: boolean;
  multipleValues: MultipleValue[];
  props: any;
  value: string | undefined;
  open: boolean;
}
const SelectComponent = ({
  disabled,
  id,
  setOpenClose,
  multiple,
  multipleValues,
  props,
  open,
  value,
}: Props) => {
  return (
    <>
      <button
        type="button"
        tabIndex={0}
        id={id}
        onClick={() => setOpenClose(!open)}
        disabled={disabled}
        className="select-none min-w-80 text-start bg-white w-full px-2 h-10 items-center pr-16 text-sm border outline-none border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 disabled:bg-gray-100 placeholder:text-gray-700 flex justify-between"
      >
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          {multiple
            ? multipleValues.length
              ? `${multipleValues.length} seleccionado${
                  multipleValues.length > 1 ? "s" : ""
                }`
              : props.placeholder
            : value}
        </p>
      </button>
      <div className="h-5 text-gray-500 absolute right-10 pointer-events-none top-1/2 -translate-y-1/2">
        {open ? <IconUp /> : <IconDown />}
      </div>
    </>
  );
};

export default SelectComponent;
