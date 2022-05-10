import { useContext } from "react";
import ModalContext from "src/context/ModalContext";

const useModal = () => {
  return useContext(ModalContext);
};

export default useModal;
