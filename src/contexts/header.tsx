import React, { createContext, useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  windows: Window[];
  setWindows: React.Dispatch<React.SetStateAction<Window[]>>;
  closeAllWindows: () => void;
}

export const HeaderContext = createContext<Props | null>(null);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(
      "this contexts must be used whitin a HeaderContextProvider"
    );
  }
  return context;
};

interface Window {
  name: string;
  route: string;
}

export const HeaderContextProvider = ({ children }: any) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const { pathname } = useLocation();

  const closeAllWindows = () => {
    setWindows((old) => old.filter((window) => pathname === window.route));
  };

  const value = useMemo(
    () => ({
      windows,
      setWindows,
      closeAllWindows,
    }),
    [windows, setWindows, closeAllWindows]
  );
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};
