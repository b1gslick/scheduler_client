import { useState } from "react";
import NoteButton from "../UI/NoteButton";
import "./NoteStyles.css";
import {
  faTrash,
  faPlayCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../UI/Modal";
import EditNote from "./EditNote";
import Timer from "../timer/Timer";
import { convertMinsToHrsMins } from "../../Utils/helper";

export type NoteProps = {
  id: number;
  title: string;
  description: string;
  time: number;
  remove?: any;
  playTimer?: any;
  edit?: any;
};

const Note = (props: NoteProps) => {
  const [editModal, setEditModal] = useState(false);
  const [playModal, setTimerModal] = useState(false);

  return (
    <div>
      <Modal visible={editModal} setVisible={setEditModal}>
        <EditNote note={props} edit={props.edit}></EditNote>
      </Modal>
      <Modal visible={playModal} setVisible={setTimerModal}>
        <Timer note={props} playTimer={props.playTimer}></Timer>
      </Modal>
      <a href="#" className="note__container">
        <h2
          className="header"
          data-testid="note-title"
          suppressContentEditableWarning={true}
        >
          {props.title}
        </h2>
        <form className="title">
          <p
            className="title"
            data-testid="note-desc"
            suppressContentEditableWarning={true}
          >
            {props.description}
          </p>
        </form>
        <form className="time">
          <p data-testid="note-timebox">{convertMinsToHrsMins(props.time)}</p>
        </form>
        <div className="button_container">
          <NoteButton icon={faPlayCircle} onClick={() => setTimerModal(true)} />
          <NoteButton icon={faEdit} onClick={() => setEditModal(true)} />
          <NoteButton icon={faTrash} onClick={() => props.remove?.(props)} />
        </div>
      </a>
    </div>
  );
};
export default Note;
