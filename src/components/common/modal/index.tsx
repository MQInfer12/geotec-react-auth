import IconX from "../../../assets/iconC";
import { ModalState } from "./hook/useModal";
import Button from "../button/button";
import Title from "../title/title";
import "../../../index.css";

interface Props {
  children: React.ReactNode;
  state: ModalState;
}

const Modal = ({ children, state }: Props) => {
  if (!state.open) return null;
  return (
    <div
      className={`z-50 w-full h-full fixed inset-0 p-5 flex items-center justify-center isolate `}
    >
      <div
        onClick={state.closeModal}
        className="w-full h-full bg-black/20 fixed top-0 left-0 -z-10 animate-[appear_.3s]"
      />
      <div className="max-w-[100%] max-h-[80%] overflow-y-auto relative bg-gray-100 rounded-lg isolate">
        <header className="w-full flex justify-between sticky top-0 items-center pt-2 px-4 z-10 bg-gray-100">
          <Title textSize="base">{state.title}</Title>
          <Button onClick={state.closeModal} icon={<IconX />} />
        </header>
        <div className="py-4 px-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
