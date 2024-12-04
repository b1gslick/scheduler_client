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
import { convertMinsToHrsMins } from "../../utils/helper";

export type NoteProps = {
  id: number;
  title: string;
  description: string;
  isFinish: boolean;
  time: any;
  remove?: any;
  edit?: any;
};

const Note = (props: NoteProps) => {
  const [editModal, setEditModal] = useState(false);
  const [playModal, setTimerModal] = useState(false);

  return (
    <div>
      <Modal
        visible={editModal}
        makevisible={setEditModal}
        data-testid="edit-modal"
      >
        <EditNote note={props} edit={props.edit}></EditNote>
      </Modal>
      <Modal
        visible={playModal}
        makevisible={setTimerModal}
        data-testid="timer-modal"
      >
        <Timer note={props}></Timer>
      </Modal>
      <a href="#" className="note__container" data-testid="note-container">
        <h2
          className="header"
          data-testid="note-title"
          suppressContentEditableWarning={true}
        >
          {props.title}
        </h2>
        <form className="title form_notes">
          <p
            className="title"
            data-testid="note-desc"
            suppressContentEditableWarning={true}
          >
            {props.description}
          </p>
        </form>
        <form className="time form_notes">
          <p data-testid="note-timebox">{convertMinsToHrsMins(props.time)}</p>
        </form>
        <div className="button_container">
          <NoteButton
            aria-label="play button"
            icon={faPlayCircle}
            onClick={() => setTimerModal(true)}
            data-testid="note-play-button"
          />
          <NoteButton
            aria-label="edit button"
            icon={faEdit}
            data-testid="note-edit-button"
            onClick={() => setEditModal(true)}
          />
          <NoteButton
            aria-label="delete button"
            icon={faTrash}
            data-testid="note-delete-button"
            onClick={() => props.remove?.(props)}
          />
        </div>
      </a>
    </div>
  );
};
export default Note;
