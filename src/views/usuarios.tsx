import { ENDPOINTS } from "@/constants/endpoints";
import { PageContainer, TableContainer, createColumns, useGet } from "..";
import { UsuarioRes } from "@/res/UsuarioRes";
import { useModal } from "@/components/common/modal/hook/useModal";

const Users = () => {
  const { res, getData } = useGet<
    UsuarioRes[]
  >(ENDPOINTS.USUARIO.GET);

  const {
    openModal: openGrupos,
  } = useModal<UsuarioRes>("Permisos de grupos");

  const columns = createColumns<UsuarioRes>([
    {
      header: "Nombre",
      accessorKey: "login",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },  {
        header: "Verificado",
        accessorKey: "verificado",
      },
    {
      header: "Firma",
      accessorKey: "firma",
    },
    {
      header: "Notificacion",
      accessorKey: "notificacion",
    }
  ]);

  return (
    <PageContainer title="Usuarios">
      <TableContainer
        name="usuarios"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reload={getData}
        controls={[
          {
            label: "Asignar grupos",
            fn: (row) => openGrupos(row),
          },
        ]}
      />
    </PageContainer>
  );
};

export default Users;
