import { ENDPOINTS } from "@/constants/endpoints";
import { GrupoRes } from "@/interfaces/GrupoRes";
import { PageContainer, TableContainer, createColumns, useGet } from "..";
import { useModal } from "@/components/common/modal/hook/useModal";
import Floating from "@/components/common/floating";
/* import AsignarMenus from "./components/asignarAccesos"; */

export const Grupos = () => {
  const { res, getData } = useGet<GrupoRes[]>(ENDPOINTS.GRUPO.GET);

  const {
    state: stateMenus,
    item: itemMenus,
    openModal: openMenus,
    closeModal: closeMenus,
  } = useModal<GrupoRes>("Permisos de menús");

  const columns = createColumns<GrupoRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
  ]);

  return (
    <PageContainer title="Grupos">
      <TableContainer
        name="grupos"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reload={getData}
        controls={[
          {
            label: "Asignar menús",
            fn: (row) => openMenus(row),
          },
        ]}
      />

 {/*      <Floating state={stateMenus}>
        <AsignarMenus
          item={itemMenus}
          onSuccess={() => {
            alert("click");
          }}
          close={closeMenus}
        />
      </Floating> */}
    </PageContainer>
  );
};


