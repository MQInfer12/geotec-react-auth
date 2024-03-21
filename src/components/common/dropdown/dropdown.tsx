import { useId, useState } from "react";
import Title from "../title/title";
import Button from "../button/button";
import IconX from "@assets/icons/iconX";
import OutsideAlerter from "../utils/outsideAlerter";
import { autoUpdate, flip, useFloating } from "@floating-ui/react";
import { createPortal } from "react-dom";

interface Props {
  toggleElement: JSX.Element | ((open: boolean) => JSX.Element);
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
  hover?: boolean;
}

const Dropdown = ({
  toggleElement,
  children,
  title,
  disabled,
  hover,
}: Props) => {
  const [open, setOpen] = useState(false);
  const isOpen = open && !disabled;
  const id = useId();

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    open: isOpen,
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
  });

  const handleToggle = () => {
    if (!disabled && !hover) {
      setOpen(!open);
    }
  };

  return (
    <>
      <div
        className="relative max-w-max"
        onMouseEnter={() => hover && setOpen(true)}
        onMouseLeave={() => hover && setOpen(false)}
      >
        <div
          ref={refs.setReference}
          onClick={handleToggle}
          id={id}
          className="cursor-pointer"
        >
          <div className="pointer-events-none">
            {typeof toggleElement === "function"
              ? toggleElement(open)
              : toggleElement}
          </div>
        </div>
      </div>
      {isOpen &&
        createPortal(
          <OutsideAlerter exceptElement={id} onEvent={() => setOpen(false)}>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                zIndex: 200,
              }}
            >
              <div
                className={`flex flex-col border border-gray-300 w-96 bg-white shadow-sm rounded-md`}
              >
                <div className={`flex items-center gap-4 px-4 pt-2`}>
                  <Title nowrap>{title || ""}</Title>
                  <Button
                    onClick={() => setOpen(false)}
                    btnType="tertiary"
                    icon={<IconX />}
                  />
                </div>
                <div className={`px-4 pt-2 pb-4`}>{children}</div>
              </div>
            </div>
          </OutsideAlerter>,
          document.body
        )}
    </>
  );
};

export default Dropdown;
