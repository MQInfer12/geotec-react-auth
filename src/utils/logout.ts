import { ResponseReturn } from "../interfaces/responseReturn";
import { deleteAuthCookie } from "./authCookie";

export async function logoutFetch(): Promise<ResponseReturn> {
  deleteAuthCookie();
  return {
    status: "success",
    message: "Cierre de sesión correcto",
    data: undefined,
  };
}
