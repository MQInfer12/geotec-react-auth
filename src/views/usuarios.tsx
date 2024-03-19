import { ENDPOINTS } from "@/constants/endpoints";
import { PageContainer, TableContainer, createColumns, useGet } from "..";
import { UsuarioRes } from "@/interfaces/UsuarioRes";
import { useModal } from "@/components/common/modal/hook/useModal";
import Floating from "@/components/common/floating";
import Form from "@/components/common/form/form";
import { GrupoRes } from "@/interfaces/GrupoRes";

const Users = () => {
  const { res, getData } = useGet<UsuarioRes[]>(ENDPOINTS.USUARIO.GET);

  const {
    state: stateGrupos,
    openModal: openGrupos,
    closeModal: closeGrupos,
    item: itemGrupos,
  } = useModal<UsuarioRes>("Permisos de grupos");

  const columns = createColumns<UsuarioRes>([
    {
      header: "Nombre",
      accessorKey: "login",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
    {
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
    },
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
      <Floating state={stateGrupos} width="30%">
        <PageContainer title="Asignar grupos" backRoute={closeGrupos}>
          <Form
            debug
            item={itemGrupos}
            initialValues={{
              grupos: [],
            }}
/*             put={{
              route: ENDPOINTS.USUARIO.GRUPOS + itemGrupos?.id,
              onBody: (value) => ({
                idsGrupo: value.grupos,
              }),
              onSuccess: (data) => {
                modifyData(data, (value) => value.id === data.id);
                closeGrupos();
              },
            }} */
          >
            <Form.Select<GrupoRes>
              route={ENDPOINTS.GRUPO.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione grupos"
              name="grupos"
              title="Grupos"
              alwaysShow
            />
          </Form>
        </PageContainer>
      </Floating>
    </PageContainer>
  );
};

export default Users;
