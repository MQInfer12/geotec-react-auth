import { serverAPI } from "../config";
import { AUTH } from "../constants/endpoints";
import { ApiResponse } from "../interfaces/apiResponse";
import { ResponseReturn } from "../interfaces/responseReturn";
import { Version } from "../interfaces/versions";
import { setAuthCookie } from "./authCookie";

export interface LoginForm {
  login: string;
  password: string;
}

interface LoginFetchBody extends LoginForm {
  projectCluster: string;
}

export async function loginFetch(
  body: LoginFetchBody,
  version: Version
): Promise<ResponseReturn> {
  const response = await fetch(
    serverAPI + AUTH.BASE + `/${version}` + AUTH.LOGIN,
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
  setAuthCookie(json.data);
  return {
    status: "success",
    message: json.message,
    data: undefined,
  };
}
