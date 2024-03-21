interface Props {
  expand: boolean;
  children: React.ReactNode;
}

const Expandable = ({ children, expand }: Props) => {
  const classNames = ["transition-[grid-template-rows] duration-300 grid"];
  if (expand) {
    classNames.push("grid-rows-[1fr]");
  } else {
    classNames.push("grid-rows-[0fr]");
  }
  return (
    <div
      className={classNames.join(" ")}
    >
      <div className={"overflow-hidden"}>{children}</div>
    </div>
  );
};

export default Expandable;
