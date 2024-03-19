import { serverAPI } from "../config";
import { AUTH } from "../constants/endpoints";
import { ApiResponse } from "../interfaces/apiResponse";
import { ResponseReturn } from "../interfaces/responseReturn";
import { Version } from "../interfaces/versions";

export interface RegisterForm {
  login: string;
  password: string;
}

interface RegisterFetchBody extends RegisterForm {
  projectCluster: string;
}

export const registerFetch = async (
  body: RegisterFetchBody,
  version: Version
): Promise<ResponseReturn> => {
  const response = await fetch(
    serverAPI + AUTH.BASE + `/${version}` + AUTH.REGISTER,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const json: ApiResponse<string> = await response.json();
  if (!response.ok) {
    return {
      status: "error",
      message: json.message,
    };
  }
  return {
    status: "success",
    message: json.message,
    data: undefined,
  };
};
