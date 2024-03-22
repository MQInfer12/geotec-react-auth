import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../interfaces/apiResponse";
import { deleteAuthCookie, getAuthCookie } from "../utils/authCookie";
import { serverAPI } from "../config";
import { useAuthContext } from "../contexts/auth";

interface ReturnValues<T> {
  res: ApiResponse<T> | null;
  loading: boolean;
  setRes: React.Dispatch<React.SetStateAction<ApiResponse<T> | null>>;
  getData: () => Promise<void>;
  pushData: (data: T extends Array<infer U> ? U : T) => void;
  modifyData: (
    data: T extends Array<infer U> ? U : T,
    condition: (value: T extends Array<infer U> ? U : T) => boolean
  ) => void;
  filterData: (
    filter: (value: T extends Array<infer U> ? U : T) => boolean
  ) => void;
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
 
      const token = getAuthCookie(); 
 
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

  const pushData = (data: T extends Array<infer U> ? U : T) => {
    setRes((old) => {
      if (!old) return null;
      if (!Array.isArray(old.data)) return old;
      return {
        ...old,
        data: [...old.data, data] as T,
      };
    });
  };

  const filterData = (
    filter: (value: T extends Array<infer U> ? U : T) => boolean
  ) => {
    setRes((old) => {
      if (!old) return null;
      if (!Array.isArray(old.data)) return old;
      return {
        ...old,
        data: old.data.filter((value) => filter(value)) as T,
      };
    });
  };

  const modifyData = (
    data: T extends Array<infer U> ? U : T,
    condition: (value: T extends Array<infer U> ? U : T) => boolean
  ) => {
    setRes((old) => {
      if (!old) return null;
      if (!Array.isArray(old.data)) return old;
      return {
        ...old,
        data: old.data.map((value) => {
          if (condition(value)) {
            return data;
          }
          return value;
        }) as T,
      };
    });
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
    pushData,
    filterData,
    modifyData,
  };
};
