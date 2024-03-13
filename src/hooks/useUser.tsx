import { Data, useAuthContext } from "../contexts/user";
import { getUserData } from "../utils/getUserData";

interface UseUserReturn extends Data {
  getUser: () => Promise<boolean>;
}

export const useUser = (): UseUserReturn => {
  const { user, version, menus, accesos, setData, setState } = useAuthContext();

  const getUser = async () => {
    const res = await getUserData(version);
    if (res.status === "error") return false;
    setData(res.data);
    setState("logged");
    return true;
  };

  return {
    user,
    accesos,
    menus,
    getUser,
  };
};
