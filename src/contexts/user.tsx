import { createContext, useContext, useMemo, useState } from "react";
import { User } from "../interfaces/user";
import { MenuPadre } from "../interfaces/menu";
import { Acceso } from "../interfaces/acceso";
import { getAuthCookie } from "../utils/authCookie";
import { Version } from "../interfaces/versions";

export interface Data {
  user?: User;
  menus?: MenuPadre[];
  accesos?: Acceso[];
}

export type AuthState = "unlogged" | "loading" | "logged";

interface AuthContextValue extends Data {
  state: AuthState;
  projectCluster: string;
  version: Version;
  logoutRoute: string;
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
  setState: React.Dispatch<React.SetStateAction<AuthState>>;
}



interface Props {
  projectCluster: string;
  version: Version;
  logoutRoute: string;
  children: React.ReactNode;
}

const Ctx = createContext<AuthContextValue | null>(null);

export const AuthContext = ({
  projectCluster,
  version,
  logoutRoute,
  children,
}: Props) => {
  const token = getAuthCookie();
  const [data, setData] = useState<Data | null>(null);
  const [state, setState] = useState<AuthState>(token ? "loading" : "unlogged");

  const value = useMemo<AuthContextValue>(
    () => ({
      ...data,
      state,
      projectCluster,
      version,
      setState,
      setData,
      logoutRoute,
    }),
    [data, state, projectCluster, version, setState, setData, logoutRoute]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthContext");
  }
  return context;
};
