import { useEffect, useState } from "react";
import AppButton from "../UI/AppButton";
import { NoteProps } from "./Note";
import "./Note.css";

export type EditNoteProps = {
  edit: (e: NoteProps) => {};
  note: NoteProps;
  modalState: (e: boolean) => void;
};

const EditNote = (props: EditNoteProps) => {
  const [title, setEditTitle] = useState(props.note.title);
  const [description, setEditDescription] = useState(props.note.description);
  const [time, setEditTime] = useState(props.note.time);

  useEffect(() => {
    return () => {};
  }, []);

  const editNote = (e: any) => {
    e.preventDefault();
    const note = {
      ...props.note,
      title: title,
      description: description,
      time: time,
    };
    props.edit(note);
    props.modalState(false);
  };

  return (
    <div className="note" data-testid="edit-note">
      <form>
        <input
          value={title}
          aria-label="title"
          onChange={(e: any) => setEditTitle(e.target.value)}
          className="inputTitle"
          data-testid="edit-title"
          type="text"
        ></input>
        <textarea
          value={description}
          aria-label="description"
          onChange={(e: any) => setEditDescription(e.target.value)}
          className="inputDesc"
          data-testid="edit-descr"
        ></textarea>
        <input
          value={time}
          aria-label="time"
          onChange={(e: any) => setEditTime(e.target.value)}
          className="inputTime"
          data-testid="edit-time"
          type="number"
          min={0}
          max={1440}
        ></input>
      </form>
      <AppButton aria-label="save" onClick={editNote} data-testid="save-button">
        Save
      </AppButton>
    </div>
  );
};

export default EditNote;
