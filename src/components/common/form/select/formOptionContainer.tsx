import { useId } from "react";
import Expandable from "../../utils/expandable";
import { createPortal } from "react-dom";
import IconSearch from "../../../../assets/icons/iconSearch";

interface Props {
  open: boolean;
  searchable: boolean;
  alwaysShow?: boolean;
  error?: string;
  children: React.ReactNode;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  floatingStyles: React.CSSProperties;
  setFloatingRef: (node: HTMLElement | null) => void;
  containerId: string;
}

const FormOptionContainer = ({ children, ...props }: Props) => {
  if (props.alwaysShow) {
    return <Render {...props}>{children}</Render>;
  }
  return createPortal(<Render {...props}>{children}</Render>, document.body);
};

const Render = ({
  filter,
  floatingStyles,
  open,
  searchable,
  setFilter,
  setFloatingRef,
  alwaysShow,
  error,
  children,
  containerId: cId
}: Props) => {
  const id = useId();

  const containerClasses = ["z-40 top-full"];
  if (!alwaysShow) {
    containerClasses.push("shadow-xl");
  }

  const optionContainerClasses = [
    "z-40 top-full flex flex-col bg-white w-full border ring-gray-300 overflow-auto",
  ];
  if (error && alwaysShow) {
    optionContainerClasses.push("border-danger");
  } else {
    optionContainerClasses.push("border-gray-300");
  }
  if (!alwaysShow) {
    optionContainerClasses.push("max-h-60");
  }

  return (
    <div
      id={cId}
      className={containerClasses.join(" ")}
      style={
        alwaysShow
          ? undefined
          : {
              ...floatingStyles,
              zIndex: 200,
            }
      }
      ref={alwaysShow ? undefined : setFloatingRef}
    >
      <Expandable expand={open}>
        <div className={optionContainerClasses.join(" ")}>
          {searchable && !alwaysShow && (
            <div className="p-2 bg-white">
              <div className="flex rounded-[4px] border border-gray-300">
                <input
                  autoComplete="off"
                  id={id}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  autoFocus
                  className="w-full px-2 py-1 text-[12px] outline-none text-black/80 rounded-tl-[4px] rounded-bl-[4px]"
                />
                <label
                  htmlFor={id}
                  className="h-[29px] p-[6px] text-black/40 aspect-square"
                >
                  <IconSearch />
                </label>
              </div>
            </div>
          )}
          {children}
        </div>
      </Expandable>
    </div>
  );
};

export default FormOptionContainer;
