import { AuthState, useAuthContext } from "../contexts/user";
import { getUserData } from "../utils/getUserData";
import { LoginForm, loginFetch } from "../utils/login";
import { logoutFetch } from "../utils/logout";
import { RegisterForm, registerFetch } from "../utils/register";

interface UseAuthReturn {
  state: AuthState;
  register: (body: RegisterForm) => Promise<boolean>;
  login: (body: LoginForm) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export const useAuth = (): UseAuthReturn => {
  const { state, setData, setState, projectCluster, version } =
    useAuthContext();

  const register = async (body: RegisterForm) => {
    const register = await registerFetch({ ...body, projectCluster }, version);
    if (register.status === "error") return false;
    return true;
  };

  const login = async (body: LoginForm) => {
    const logged = await loginFetch({ ...body, projectCluster }, version);
    if (logged.status === "error") return false;
    const res = await getUserData(version);
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

  return {
    state,
    login,
    logout,
    register,
  };
};
