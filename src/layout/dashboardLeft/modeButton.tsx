import { useEffect } from "react";
import { useTheme } from "../../contexts/mode";
import IconLightMode from "../../assets/icons/iconLightMode";
import IconDarkMode from "../../assets/icons/iconDarkMode";

const ModeButton = () => {
  const themes = useTheme();
  const mode = themes.theme;
  const setMode = themes.toggleTheme;
  const classNames = [
    "h-full w-3 bg-gray-400 rounded-full absolute transition-all duration-300",
  ];
  if (mode === "light") {
    classNames.push("left-0");
  } else {
    classNames.push("left-[calc(100%_-_12px)]");
  }
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <button
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      className=" w-full aspect-square overflow-hidden p-4 flex transition-all duration-300 flex-col items-center gap-3 text-gray-400"
    >
      {
        {
          light: <IconLightMode />,
          dark: <IconDarkMode />,
        }[mode]
      }
      <div className="h-6 border relative border-gray-400 w-6 rounded-full flex">
        <div className={classNames.join(" ")} />
      </div>
    </button>
  );
};

export default ModeButton;
