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

export const useGet = <T,>(
  route: string,
  opt?: Options,
  otherService?: boolean
): ReturnValues<T> => {
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
      let endPoint = serverAPI + route;

      //if the user wants to use another service
      if (otherService) endPoint = route;

      //const token = getAuthCookie();
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjVhOGY0YjYyLTJhYjQtNDU1My1hZmNhLTQzOGJkNjgwZjA0YyIsImV4cCI6MTcxMTEwOTc0OCwiaXNzIjoiaHR0cHM6Ly9nZW90ZWMuY29tIiwiYXVkIjoiaHR0cHM6Ly9nZW90ZWMuY29tIn0.CwF05XdX5W0G7Mi_kHRMJW7YK1c5lSbe2nmGq2A2QYA";
      const response = await fetch(
        endPoint,
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
        let json: ApiResponse<T> = await response.json();

        //if the user used another service
        if (otherService) {
          json = {
            message: "Datos obtenidos con exito",
            status: 200,
            //@ts-ignore
            data: json.cabecera,
          };
        }

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
