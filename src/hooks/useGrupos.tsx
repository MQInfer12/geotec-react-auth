import { ENDPOINTS } from "../constants/endpoints";
import { Grupo } from "../interfaces/grupo";
import { useGet } from "./useGet";
import { useRequest } from "./useRequest";

export interface GrupoBody {
  nombre: string;
  descripcion: string;
}

export const useGrupos = (get: boolean = false) => {
  const { sendRequest } = useRequest();
  const { res: list } = useGet(ENDPOINTS.GRUPO.GET, {
    send: get,
  });

  const post = async (body: GrupoBody) => {
    const res = await sendRequest<Grupo>(ENDPOINTS.GRUPO.POST, body);
    return res;
  };

  const put = async (id: string, body: GrupoBody) => {
    const res = await sendRequest<Grupo>(ENDPOINTS.GRUPO.PUT + id, body, {
      method: "PUT",
    });
    return res;
  };

  const del = async (id: string) => {
    const res = await sendRequest<null>(ENDPOINTS.GRUPO.DELETE + id, null, {
      method: "PUT",
    });
    return res;
  };

  return {
    list,
    post,
    put,
    del,
  };
};
