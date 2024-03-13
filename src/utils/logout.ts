import { deleteAuthCookie } from "./authCookie";

interface LogoutFetchReturn {
  status: "error" | "success";
  message: string;
}

export async function logoutFetch(): Promise<LogoutFetchReturn> {
  deleteAuthCookie();
  return {
    status: "success",
    message: "Cierre de sesión correcto",
  };
}
