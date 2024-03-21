import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHeaderContext } from "../contexts/header";

interface Props {
  children: JSX.Element;
}

const KeyboardControls = ({ children }: Props) => {
  const { pathname } = useLocation();
  const { closeAllWindows } = useHeaderContext();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "q") {
        console.log("Ctrl + Alt + Q");
        closeAllWindows();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [pathname]);
  return children;
};

export default KeyboardControls;
