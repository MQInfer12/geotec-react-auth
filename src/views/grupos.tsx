import Floating from "../components/common/floating";
import { useModal } from "../components/common/modal/hook/useModal";
import { PageContainer } from "../components/common/pageContainer/pageContainer";
import { TableContainer } from "../components/common/table/tableContainer";
import { ENDPOINTS } from "../constants/endpoints";
import { useGet } from "../hooks/useGet";
import { GrupoRes } from "../interfaces/GrupoRes";
import { createColumns } from "../utils/createColumns";
import AsignarMenus from "./components/asignarAccesos"; 


interface Props {
  alertSuccess: (msg: string) => void;
}

export const Grupos = ({ alertSuccess }: Props) => {
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
        toast={alertSuccess}
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
          alertSuccess={alertSuccess}
          item={itemMenus}
          onSuccess={(data) => {
            modifyData(data, (row) => row.id === data.id);
            closeMenus();
          }}
          close={closeMenus}
        />
      </Floating>{" "}
      *
    </PageContainer>
  );
};
