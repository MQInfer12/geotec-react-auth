import { useLocation } from "react-router-dom";
import Logo from "@assets/images/logo.png";

interface Props {
  onClick: () => void;
  open: boolean;
  initialRoute: string;
}

const LogoButton = ({ onClick, open, initialRoute }: Props) => {
  const { pathname } = useLocation();

  const classNames = [
    "w-full aspect-square flex transition-all duration-300 flex-col justify-center gap-1",
  ];
  if (pathname === initialRoute && !open) {
    classNames.push("bg-primary-500 text-white");
  } else {
    classNames.push("text-gray-400");
  }

  return (
    <button onClick={onClick} className={classNames.join(" ")}>
      <div className="w-3/5 h-3/5 self-center">
        <img className="h-full w-full" src={Logo} />
      </div>
    </button>
  );
};

export default LogoButton;
