import { UserRes } from "../../interfaces/user";
import Floating from "../common/floating";
import Modal from "../common/modal";
import { useModal } from "../common/modal/hook/useModal";

interface Props {}

const Usuario = ({}: Props) => {
  const { state, item, openModal, closeModal } =
    useModal<UserRes>("Formulario usuario");
  const {
    state: stateGrupos,
    item: itemGrupos,
    openModal: openGrupos,
  } = useModal<UserRes>("Permisos de grupos");
  return (
    <>
      <button onClick={()=>openModal()}>Modal</button>
      <button onClick={() => openGrupos()}>FLoating</button>
      <Floating state={stateGrupos} width="30%">
        <h1>hola</h1>
      </Floating>
      <Modal state={state}>
        <h1>Hola modal</h1>
      </Modal>
    </>
  );
};

export default Usuario;
