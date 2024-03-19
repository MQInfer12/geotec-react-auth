/* import { GrupoRes } from "@/interfaces/GrupoRes";
import { ENDPOINTS } from "@/constants/endpoints";
import { MenuRes } from "@/interfaces/MenuRes";
import { useGet } from "@/hooks/useGet";
import Loader from "@/components/common/loader/loader";
import Checkbox from "@/components/common/inputs/checkbox";
import Button from "@/components/common/button/button";
import { useLayoutEffect, useState } from "react";
import Title from "@/components/common/title/title";
import Expandable from "@/components/common/utils/expandable";
import { Modelo } from "@/interfaces/modelo";
import { useRequest } from "@/hooks/useRequest";
import { alertSuccess } from "@/utils/alertsToast";
import { PageContainer } from "@/components/common/pageContainer/pageContainer";

interface Props {
  item: GrupoRes | null;
  onSuccess: (data: GrupoRes) => void;
  close: () => void;
}

interface Body {
  idMenu: number;
  accesos: {
    idModelo: number;
    ver: boolean;
    agregar: boolean;
    editar: boolean;
    eliminar: boolean;
  }[];
}

const AsignarMenus = ({ item, onSuccess, close }: Props) => {
  const { res } = useGet<MenuRes[]>(ENDPOINTS.MENU.GET);
  console.log(res);
  const { sendRequest } = useRequest();
  const [form, setForm] = useState<Body[]>([]);

  const handleAll = () => {
    if (!res) return;
    setForm(
      res.data.map((menu) => ({
        idMenu: menu.id,
        accesos: menu.modelos.map((modelo) => ({
          idModelo: modelo.id,
          ver: true,
          agregar: true,
          editar: true,
          eliminar: true,
        })),
      }))
    );
  };
  const handleNone = () => {
    setForm([]);
  };

  const handleChangeMenu = (menu: MenuRes) => {
    setForm((old) => {
      const exists = old.some((v) => v.idMenu === menu.id);
      if (exists) {
        return old.filter((v) => v.idMenu !== menu.id);
      }
      return [
        ...old,
        {
          idMenu: menu.id,
          accesos: menu.modelos.map((modelo) => ({
            idModelo: modelo.id,
            ver: true,
            agregar: true,
            editar: true,
            eliminar: true,
          })),
        },
      ];
    });
  };

  const handleChangeAcceso = (
    menu: MenuRes,
    modelo: Modelo,
    acceso: "ver" | "agregar" | "editar" | "eliminar"
  ) => {
    setForm((old) =>
      old.map((v) => {
        if (v.idMenu === menu.id) {
          return {
            ...v,
            accesos: v.accesos.map((a) => {
              if (a.idModelo === modelo.id) {
                return {
                  ...a,
                  [acceso]: !a[acceso],
                };
              }
              return a;
            }),
          };
        }
        return v;
      })
    );
  };

  const handleSend = async () => {
    const res = await sendRequest<GrupoRes>(
      ENDPOINTS.GRUPO.ACCESOS + item?.id,
      form,
      {
        method: "PUT",
      }
    );
    if (res) {
      alertSuccess(res.message);
      onSuccess(res.data);
    }
  };

  useLayoutEffect(() => {
    if (!res || !item) return;
    const idsMenus = item.menus.map((m) => m.id);
    setForm(
      res.data
        .filter((menu) => idsMenus.includes(menu.id))
        .map((menu) => ({
          idMenu: menu.id,
          accesos: menu.modelos.map((modelo) => ({
            idModelo: modelo.id,
            ver: !!item.accesos.find((a) => a.idModelo === modelo.id)?.ver,
            agregar: !!item.accesos.find((a) => a.idModelo === modelo.id)
              ?.crear,
            editar: !!item.accesos.find((a) => a.idModelo === modelo.id)
              ?.editar,
            eliminar: !!item.accesos.find((a) => a.idModelo === modelo.id)
              ?.eliminar,
          })),
        }))
    );
  }, [res]);

  if (!res) return <Loader />;
  return (
    <PageContainer backRoute={close} padding={false} title="Asignar permisos">
      <div className="sticky top-0 pb-4 px-4 w-full bg-white flex gap-2">
        <Button width="full" onClick={handleAll}>
          Seleccionar todo
        </Button>
        <Button width="full" btnType="secondary" onClick={handleNone}>
          Quitar todo
        </Button>
      </div>
      <div className="flex flex-col gap-3 pl-5 pr-10">
        {res.data.map((menu) => (
          <div className="flex flex-col gap-2 border-b" key={menu.id}>
            <Checkbox
              title={menu.nombre}
              value={!!form.some((v) => v.idMenu === menu.id)}
              onChange={() => handleChangeMenu(menu)}
            />
            <Expandable expand={!!form.some((v) => v.idMenu === menu.id)}>
              {menu.modelos.map((modelo) => (
                <div
                  key={modelo.id}
                  className="flex flex-col gap-2 pl-7 pt-1 pb-2"
                >
                  <Title textSize="sm">{modelo.modelo}</Title>
                  <div className="flex gap-5">
                    <Checkbox
                      title="Ver"
                      value={form.some(
                        (v) =>
                          v.accesos.find((a) => a.idModelo === modelo.id)?.ver
                      )}
                      onChange={() => handleChangeAcceso(menu, modelo, "ver")}
                    />
                    <Checkbox
                      title="Agregar"
                      value={form.some(
                        (v) =>
                          v.accesos.find((a) => a.idModelo === modelo.id)
                            ?.agregar
                      )}
                      onChange={() =>
                        handleChangeAcceso(menu, modelo, "agregar")
                      }
                    />
                    <Checkbox
                      title="Editar"
                      value={form.some(
                        (v) =>
                          v.accesos.find((a) => a.idModelo === modelo.id)
                            ?.editar
                      )}
                      onChange={() =>
                        handleChangeAcceso(menu, modelo, "editar")
                      }
                    />
                    <Checkbox
                      title="Eliminar"
                      value={form.some(
                        (v) =>
                          v.accesos.find((a) => a.idModelo === modelo.id)
                            ?.eliminar
                      )}
                      onChange={() =>
                        handleChangeAcceso(menu, modelo, "eliminar")
                      }
                    />
                  </div>
                </div>
              ))}
            </Expandable>
          </div>
        ))}
        <div className="self-center">
          <Button onClick={handleSend}>Modificar</Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default AsignarMenus;
 */