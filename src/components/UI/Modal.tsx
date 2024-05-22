import { Dispatch, SetStateAction, useEffect } from "react";
import "./Modal.css";

export interface modalProps {
  children: any;
  visible: boolean;
  makevisible: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, visible, makevisible, ...other }) => {
  let rootClasses = ["modal"];
  useEffect(() => {
    const close = (e: any) => {
      if (e.keyCode === 27) {
        rootClasses = ["modal"];
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  if (visible) {
    rootClasses.push("active");
  }
  return (
    <div
      className={rootClasses.join(" ")}
      {...other}
      onClick={() => makevisible(false)}
    >
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default Modal;
