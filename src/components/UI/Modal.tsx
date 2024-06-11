import { Dispatch, SetStateAction } from "react";
import "./Modal.css";

export interface modalProps {
  children: any;
  visible: boolean;
  makevisible: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, visible, makevisible, ...other }) => {
  let rootClasses = ["modal"];

  const stopVisible = (e: any) => {
    e.stopPropagation();
  };

  if (visible) {
    rootClasses.push("active");
  }
  return (
    <div
      data-testid="modal"
      className={rootClasses.join(" ")}
      {...other}
      onClick={() => makevisible(false)}
    >
      <div
        data-testid="modal-content"
        className="modalContent"
        onClick={stopVisible}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
