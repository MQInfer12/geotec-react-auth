import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../interfaces/apiResponse";
import { deleteAuthCookie, getAuthCookie } from "../utils/authCookie";
import { serverAPI } from "../config";
import { useAuthContext } from "../contexts/user";

interface ReturnValues<T> {
  res: ApiResponse<T> | null;
  loading: boolean;
  setRes: React.Dispatch<React.SetStateAction<ApiResponse<T> | null>>;
  getData: () => Promise<void>;
}

interface Options {
  send?: boolean;
}

export const useGet = <T,>(route: string, opt?: Options): ReturnValues<T> => {
  const options = {
    send: opt?.send ?? true,
  };
  const { logoutRoute } = useAuthContext();
  const navigate = useNavigate();
  const [res, setRes] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(options.send);

  const getData = async () => {
    setLoading(true);
    try {
      const token = getAuthCookie();
      const response = await fetch(
        serverAPI + route,
        token
          ? {
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
              },
            }
          : undefined
      );
      let isValidResponse = true;
      if (response.status === 401) {
        navigate(logoutRoute);
        deleteAuthCookie();
        isValidResponse = false;
      }
      if (isValidResponse) {
        const json: ApiResponse<T> = await response.json();
        setRes(json);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.send) {
      getData();
    }
  }, []);

  return {
    res,
    loading,
    setRes,
    getData,
  };
};