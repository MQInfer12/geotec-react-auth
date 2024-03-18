import "../../../index.css";

interface Props {
  children: React.ReactNode;
  textAlign?: "start" | "center" | "end";
  nowrap?: boolean;
  textSize?: "sm" | "base" | "lg" | "xl" | "2xl";
}

const Title = ({
  children,
  nowrap = false,
  textAlign = "start",
  textSize = "xl",
}: Props) => {
  const classNames = ["w-full font-bold text-primary-900"];

  if (nowrap) {
    classNames.push("whitespace-nowrap overflow-hidden text-ellipsis");
  }

  switch (textAlign) {
    case "start":
      classNames.push("text-start");
      break;
    case "center":
      classNames.push("text-center");
      break;
    case "end":
      classNames.push("text-end");
      break;
  }

  switch (textSize) {
    case "sm":
      classNames.push("text-sm");
      break;
    case "base":
      classNames.push("text-base");
      break;
    case "lg":
      classNames.push("text-lg");
      break;
    case "xl":
      classNames.push("text-xl");
      break;
    case "2xl":
      classNames.push("text-2xl");
      break;
  }

  return <strong className={classNames.join(" ")}>{children}</strong>;
};

export default Title;
