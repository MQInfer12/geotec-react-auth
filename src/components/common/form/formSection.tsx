import { useState } from "react";
import Button from "../button/button";
import Expandable from "../utils/expandable";
import IconUp from "../../../assets/icons/iconUp";
import IconDown from "../../../assets/icons/iconDown";

interface Props {
  title?: string;
  children?: React.ReactNode;
  expandable?: boolean;
  row?: boolean;
  noBar?: boolean;
}

const FormSection = ({
  title,
  children,
  expandable = false,
  row = false,
  noBar = false,
}: Props) => {
  const [expand, setExpand] = useState(true);

  const handleExpand = () => {
    if (expandable) {
      setExpand(!expand);
    }
  };

  const classNames = ["w-full flex pb-3 px-2"];
  if (expandable) {
    classNames.push("cursor-pointer hover:bg-gray-50 transition-all duration-300");
  }

  const childrenClasses = [`min-w-80 flex-1 flex gap-y-2 gap-x-6`];
  if (!noBar) {
    childrenClasses.push("mb-3");
  }
  if (row) {
    childrenClasses.push("flex-wrap");
  } else {
    childrenClasses.push("flex-col");
  }

  return (
    <section className="w-full flex flex-col">
      {(title || expandable) && (
        <div className={classNames.join(" ")} onClick={handleExpand}>
          <strong className="text-primary-700 w-full font-bold select-none">
            {title}
          </strong>
          {expandable && (
            <Button
              type="button"
              size="small"
              btnType="tertiary"
              icon={expand ? <IconUp /> : <IconDown />}
            />
          )}
        </div>
      )}
      <Expandable expand={expand || !expandable}>
        <div className={childrenClasses.join(" ")}>{children}</div>
      </Expandable>
      {!noBar && <hr className="border border-primary-700 opacity-20" />}
    </section>
  );
};

export default FormSection;
