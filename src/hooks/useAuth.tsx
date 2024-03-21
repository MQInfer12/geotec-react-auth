import { useAuthContext } from "../contexts/auth";
import { getUserData } from "../utils/getUserData";
import { LoginForm, loginFetch } from "../utils/login";
import { logoutFetch } from "../utils/logout";
import { PasswordForm, passwordFetch } from "../utils/password";
import { RegisterForm, registerFetch } from "../utils/register";

export const useAuth = () => {
  const { state, setData, setState, projectCluster, version } =
    useAuthContext();

  const register = async (body: RegisterForm) => {
    const register = await registerFetch({ ...body, projectCluster }, version);
    if (register.status === "error") return register;
    return register;
  };

  const login = async (body: LoginForm) => {
    const logged = await loginFetch({ ...body, projectCluster }, version);
    if (logged.status === "error") return logged;
    const res = await getUserData(version);
    if (res.status === "error") return res;
    setData(res.data);
    setState("logged");
    return res;
  };

  const logout = async () => {
    const res = await logoutFetch();
    if (res.status === "success") {
      setData(null);
      setState("unlogged");
      return res;
    }
    return res;
  };

  const changePassword = async (body: PasswordForm) => {
    const res = await passwordFetch(body, version);
    if (res.status === "error") return res;
    setData((old) => ({ ...old, user: res.data }));
    return res;
  };

  return {
    state,
    login,
    logout,
    register,
    changePassword,
  };
};
