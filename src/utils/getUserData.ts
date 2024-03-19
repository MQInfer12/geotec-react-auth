import { serverAPI } from "../config";
import { AUTH } from "../constants/endpoints";
import { Acceso } from "../interfaces/acceso";
import { ApiResponse } from "../interfaces/apiResponse";
import { MenuPadre } from "../interfaces/menu";
import { ResponseReturn } from "../interfaces/responseReturn";
import { User } from "../interfaces/user";
import { Version } from "../interfaces/versions";
import { deleteAuthCookie, getAuthCookie } from "./authCookie";

export async function getUserData(version: Version): Promise<
  ResponseReturn<{
    user: User;
    menus: MenuPadre[];
    accesos: Acceso[];
  }>
> {
  const token = getAuthCookie();

  const response = await fetch(
    serverAPI + AUTH.BASE + `/${version}` + AUTH.ME,
    token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      : undefined
  );
  if (response.status === 401) {
    window.location.reload();
    deleteAuthCookie();
    return {
      status: "error",
      message: "No autorizado",
    };
  }
  if (!response.ok) {
    return {
      status: "error",
      message: "Error al obtener datos de usuario",
    };
  }
  const jsonUser: ApiResponse<User> = await response.json();

  /* const menuJson = await getMenus();
  if (!menuJson) return null; */

  return {
    status: "success",
    message: "Datos de usuario obtenidos correctamente",
    data: {
      user: jsonUser.data,
      menus: /* menuJson.data.menus */ [],
      accesos: /* menuJson.data.accesos */ [],
    },
  };
}
