import { createContext, useContext, useMemo, useState } from "react";
import { User } from "../interfaces/user";
import { MenuPadre } from "../interfaces/menu";
import { Acceso } from "../interfaces/acceso";
import { LoginForm, loginFetch } from "../utils/login";
import { getUserData } from "../utils/getUserData";
import { logoutFetch } from "../utils/logout";
import { getAuthCookie } from "../utils/authCookie";

interface Data {
  user?: User;
  menus?: MenuPadre[];
  accesos?: Acceso[];
}

type AuthState = "unlogged" | "loading" | "logged";

interface AuthContextValue extends Data {
  state: AuthState;
  login: (body: LoginForm) => Promise<boolean>;
  getUser: () => Promise<boolean>;
  logout: () => Promise<boolean>;
}

interface Props {
  projectCluster: string;
  children: React.ReactNode;
}

const Ctx = createContext<AuthContextValue | null>(null);

export const AuthContext = ({ projectCluster, children }: Props) => {
  const token = getAuthCookie();
  const [data, setData] = useState<Data | null>(null);
  const [state, setState] = useState<AuthState>(token ? "loading" : "unlogged");

  const login = async (body: LoginForm) => {
    const logged = await loginFetch({ ...body, projectCluster });
    if (logged.status === "error") return false;
    const res = await getUserData();
    if (res.status === "error") return false;
    setData(res.data);
    setState("logged");
    return true;
  };

  const getUser = async () => {
    const res = await getUserData();
    if (res.status === "error") return false;
    setData(res.data);
    setState("logged");
    return true;
  };

  const logout = async () => {
    await logoutFetch();
    setData(null);
    setState("unlogged");
    return true;
  };

  const value = useMemo(
    () => ({ ...data, state, login, logout, getUser }),
    [data, state, login, logout, getUser]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useUser = () => {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un AuthContext");
  }
  return context;
};
