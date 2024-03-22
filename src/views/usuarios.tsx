import Floating from "../components/common/floating";
import Form from "../components/common/form/form";
import ValidationPassword from "../components/common/form/validationPassword";
import Modal from "../components/common/modal";
import { useModal } from "../components/common/modal/hook/useModal";
import { PageContainer } from "../components/common/pageContainer/pageContainer";
import { TableContainer } from "../components/common/table/tableContainer";
import { ENDPOINTS } from "../constants/endpoints";
import { useGet } from "../hooks/useGet";
import { GrupoRes } from "../interfaces/GrupoRes";
import { UsuarioRes } from "../interfaces/UsuarioRes";
import { createColumns } from "../utils/createColumns";
import { UsuarioForm, usuarioSchema } from "../validations/usuario";

interface Props {
  alertSuccess: (msg: string) => void;
  alertError: (msg: string) => void;
}

export const Users = ({ alertError, alertSuccess }: Props) => {
  const { res, getData, modifyData, pushData, filterData } = useGet<
    UsuarioRes[]
  >(ENDPOINTS.USUARIO.GET);

  const columns = createColumns<UsuarioRes>([
    {
      header: "Nombre",
      accessorKey: "login",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    }
  ]);

  const {
    state: stateGrupos,
    item: itemGrupos,
    openModal: openGrupos,
    closeModal: closeGrupos,
  } = useModal<UsuarioRes>("Permisos de grupos");

  const { openModal, item, state, closeModal } =
    useModal<UsuarioRes>("Formulario usuario");

  return (
    <PageContainer title="Usuarios">
      <TableContainer
        toast={alertSuccess}
        name="usuarios"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={() => openModal()}
        reload={getData}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
          },
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

      <Modal state={state}>
        <Form<UsuarioRes, UsuarioForm>
          alertError={alertError}
          alertSuccess={alertError}
          item={item}
          initialValues={{
            telefono: item?.telefono || "",
            login: item?.login || "",
            password: item?.password || "",
          }}
          validationSchema={usuarioSchema}
          post={{
            route: ENDPOINTS.USUARIO.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={{
            route: ENDPOINTS.USUARIO.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          }}
          del={{
            route: ENDPOINTS.USUARIO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          }}
        >
          <Form.Column>
            <Form.Input name="login" title="Usuario" />
            <Form.Input name="password" title="Password" />
            <Form.Input name="telefono" title="Telefono" />
            <ValidationPassword />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};
