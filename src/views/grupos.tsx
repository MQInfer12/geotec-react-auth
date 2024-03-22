import Floating from "../components/common/floating";
import Form from "../components/common/form/form";
import Modal from "../components/common/modal";
import { useModal } from "../components/common/modal/hook/useModal";
import { PageContainer } from "../components/common/pageContainer/pageContainer";
import { TableContainer } from "../components/common/table/tableContainer";
import { ENDPOINTS } from "../constants/endpoints";
import { useGet } from "../hooks/useGet";
import { GrupoRes } from "../interfaces/GrupoRes";
import { createColumns } from "../utils/createColumns";
import { GrupoForm, grupoSchema } from "../validations/grupo";
import AsignarMenus from "./components/asignarAccesos";

interface Props {
  alertSuccess: (msg: string) => void;
  alertError: (msg: string) => void;
}

export const Grupos = ({ alertSuccess, alertError }: Props) => {
  const { res, getData, modifyData, pushData, filterData } = useGet<GrupoRes[]>(
    ENDPOINTS.GRUPO.GET
  );

  const { state, item, openModal, closeModal } = useModal<GrupoRes>(
    "Formulario de grupo"
  );

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
        add={() => openModal()}
        data={res?.data}
        reload={getData}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
          },
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
      </Floating>

      <Modal state={state}>
        <Form<GrupoRes, GrupoForm>
          alertSuccess={alertSuccess}
          alertError={alertError}
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            descripcion: item?.descripcion || "",
          }}
          validationSchema={grupoSchema}
          post={{
            route: ENDPOINTS.GRUPO.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={{
            route: ENDPOINTS.GRUPO.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          }}
          del={{
            route: ENDPOINTS.GRUPO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          }}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="descripcion" title="Descripcion" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};
