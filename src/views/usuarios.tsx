import Floating from "../components/common/floating";
import Form from "../components/common/form/form";
import { useModal } from "../components/common/modal/hook/useModal";
import { PageContainer } from "../components/common/pageContainer/pageContainer";
import { TableContainer } from "../components/common/table/tableContainer";
import { ENDPOINTS } from "../constants/endpoints";
import { useGet } from "../hooks/useGet";
import { GrupoRes } from "../interfaces/GrupoRes";
import { UsuarioRes } from "../interfaces/UsuarioRes";
import { createColumns } from "../utils/createColumns";

interface Props {
  alertSuccess: (msg: string) => void;
  alertError: (msg: string) => void;
}

export const Users = ({ alertError, alertSuccess }: Props) => {
  const { res, getData, modifyData } = useGet<UsuarioRes[]>(
    ENDPOINTS.USUARIO.GET
  );

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

  const {
    state: stateGrupos,
    item: itemGrupos,
    openModal: openGrupos,
    closeModal: closeGrupos,
  } = useModal<UsuarioRes>("Permisos de grupos");

  console.log(itemGrupos);

  return (
    <PageContainer title="Usuarios">
      <TableContainer
        toast={alertSuccess}
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
            alertError={alertError}
            alertSuccess={alertSuccess}
            item={itemGrupos}
            initialValues={{
              grupos: itemGrupos?.grupos.map((value) => value.id) || [],
            }}
            put={{
              route: ENDPOINTS.USUARIO.GRUPOS + itemGrupos?.id,
              onBody: (value) => ({
                idsGrupo: value.grupos,
              }),
              onSuccess: (data) => {
                modifyData(data, (value) => value.id === data.id);
                closeGrupos();
              },
            }}
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
