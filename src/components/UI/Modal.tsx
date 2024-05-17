import { Dispatch, SetStateAction, useEffect } from "react";
import "./Modal.css";

interface modalProps {
  children: any;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const Modal = (props: modalProps) => {
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

  if (props.visible) {
    rootClasses.push("active");
  }
  return (
    <div
      className={rootClasses.join(" ")}
      onClick={() => props.setVisible(false)}
    >
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};
export default Modal;
