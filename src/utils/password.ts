import { serverAPI } from "../config";
import { AUTH } from "../constants/endpoints";
import { ApiResponse } from "../interfaces/apiResponse";
import { ResponseReturn } from "../interfaces/responseReturn";
import { User } from "../interfaces/user";
import { Version } from "../interfaces/versions";
import { getAuthCookie } from "./authCookie";

export interface PasswordForm {
  actual: string;
  confirm: string;
  new: string;
}

export async function passwordFetch(
  body: PasswordForm,
  version: Version
): Promise<ResponseReturn<User>> {
  const token = getAuthCookie();
  console.log(token);
  if (!token) {
    return {
      status: "error",
      message: "No has iniciado sesión",
    };
  }
  const response = await fetch(
    serverAPI + AUTH.BASE + `/${version}` + AUTH.PASSWORD,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    }
  );
  const json: ApiResponse<User> = await response.json();
  if (!response.ok) {
    return {
      status: "error",
      message: json.message,
    };
  }
  return {
    status: "success",
    message: json.message,
    data: json.data,
  };
}
