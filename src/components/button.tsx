import { AnyFunction } from "../interfaces/anyFunction";

type ButtonType = "primary" | "secondary" | "tertiary" | "quaternary" | "tab";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  btnType?: ButtonType;
  toggle?: boolean;
  size?: "normal" | "small" | "square" | "smallsquare" | "input" | "inputSmall";
  activeType?: "all" | "border-b";
  borderRadius?: string;
  width?: "full" | string;
  noAnimate?: boolean;
  noHover?: boolean;
  onClickIcon?: AnyFunction;
}

const Button = ({
  icon,
  btnType = "primary",
  toggle,
  size = "normal",
  noAnimate,
  borderRadius,
  width,
  activeType = "all",
  noHover = false,
  onClickIcon,
  className,
  ...props
}: Props) => {
  const classes = ["border flex items-center"];
  if (props.children && icon) {
    classes.push("justify-between");
  }

  if (!noHover) {
    classes.push("hover:opacity-80");
  }

  if (!noAnimate) {
    classes.push("transition-all duration-300");
  }

  if (!borderRadius) {
    classes.push("rounded-md");
  }

  switch (size) {
    case "input":
      classes.push("h-10 gap-2 p-2 text-sm");
      break;
    case "inputSmall":
      classes.push("min-w-8 h-8 gap-1 p-1 text-sm");
      break;
    case "normal":
      classes.push("h-9 gap-2 p-2 text-sm");
      break;
    case "small":
      classes.push("h-6 gap-[3px] p-[3px] text-[10px]");
      break;
    case "square":
      classes.push("h-full aspect-square py-[9px] justify-center");
      break;
    case "smallsquare":
      classes.push("h-full aspect-square py-[4px] justify-center");
      break;
  }

  switch (width) {
    case "full":
      classes.push("w-full justify-between py-[5px]");
      break;
  }

  if (toggle !== undefined) {
    if (toggle === true) {
      if (activeType === "all") {
        classes.push("bg-primary-700 text-white border-primary-700");
      }
      if (activeType === "border-b") {
        classes.push(
          "border-transparent border-b-primary-700 text-primary-700 disabled:text-gray-400 dark:border-b-white"
        );
      }
      classes.push(
        "disabled:bg-gray-300 disabled:border-gray-300 disabled:pointer-events-none"
      );
    } else {
      if (activeType === "all") {
        classes.push("text-primary-700 border-primary-700");
      }
      if (activeType === "border-b") {
        classes.push("border-transparent text-gray-500 disabled:text-gray-300");
      }
      classes.push(
        "bg-white disabled:border-gray-300 disabled:text-gray-300 disabled:pointer-events-none"
      );
    }
  } else {
    if (btnType === "primary") {
      classes.push(
        "bg-primary-700 text-white border-primary-700 disabled:bg-gray-300 disabled:border-gray-300 disabled:pointer-events-none"
      );
    }
    if (btnType === "secondary") {
      classes.push(
        "text-primary-700 bg-white border-primary-700 disabled:border-gray-300 disabled:text-gray-300 disabled:pointer-events-none"
      );
    }
    if (btnType === "tertiary") {
      classes.push(
        "text-gray-500 border-transparent disabled:text-gray-300 disabled:pointer-events-none"
      );
    }
    if (btnType === "quaternary") {
      classes.push(
        "text-gray-400 border-gray-300 disabled:text-gray-300 disabled:pointer-events-none"
      );
    }
  }

  if (className) {
    classes.push(className);
  }

  return (
    <button
      {...props}
      className={classes.join(" ")}
      style={{
        borderRadius: borderRadius || undefined,
        width: width && width !== "full" ? width : undefined,
      }}
    >
      {props.children && (
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {props.children}
        </p>
      )}
      {icon && (
        <div
          onClick={(e) => {
            if (!onClickIcon) return;
            e.stopPropagation();
            onClickIcon();
          }}
          className={`h-full aspect-square ${
            onClickIcon ? "hover:opacity-50 transition-all duration-300" : ""
          }`}
        >
          {icon}
        </div>
      )}
    </button>
  );
};

export default Button;
