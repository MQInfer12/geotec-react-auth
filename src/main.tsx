import ReactDOM from "react-dom/client";
import Modal from "./components/common/modal";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <React.StrictMode>
      <App />
    </React.StrictMode> */}
    <Modal
      state={{
        title: "Hola",
        open: true,
        closeModal: () => console.log("first"),
      }}
    >
      <h1>hola</h1>
    </Modal>
  </>
);
