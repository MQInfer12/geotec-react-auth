import { ENDPOINTS } from "@/constants/endpoints";
import { GrupoRes } from "@/interfaces/GrupoRes";
import { useModal } from "@/components/common/modal/hook/useModal";
import Floating from "@/components/common/floating";
 import AsignarMenus from "./components/asignarAccesos"; 
import { createColumns } from "@/utils/createColumns";
import { useGet } from "@/hooks/useGet";
import { PageContainer } from "@/components/common/pageContainer/pageContainer";
import { TableContainer } from "@/components/common/table/tableContainer";

export const Grupos = () => {
 const { res, getData, modifyData } = useGet<GrupoRes[]>(ENDPOINTS.GRUPO.GET); 

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

     <Floating state={stateMenus}>
        <AsignarMenus
          item={itemMenus}
          onSuccess={(data) => {
            modifyData(data, (row) => row.id === data.id);
            closeMenus();
          }}
          close={closeMenus}
        />
      </Floating> *
    </PageContainer>
  );
};


