import { useState } from "react";
import AppButton from "../UI/AppButton";
import "./Note.css";
import { NoteProps } from "./Note";

export type AddNoteProps = {
  create: (e: NoteProps) => void;
  modalState: (e: boolean) => void;
};

const AddNote = (props: AddNoteProps) => {
  const [note, setNote] = useState({
    id: 0,
    title: "",
    description: "",
    time: "",
  });

  const addNewNote = (e: any) => {
    e.preventDefault();
    const newNote = {
      ...note,
      isFinish: false,
      id: Date.now(),
    };
    props.create(newNote);
    props.modalState(false);
    setNote({ id: 0, title: "", description: "", time: "" });
  };
  return (
    <div className="note" data-testid="add-note">
      <form>
        <label htmlFor="title"></label>
        <input
          value={note.title}
          name="title"
          data-testid="input-title"
          onChange={(e: any) => setNote({ ...note, title: e.target.value })}
          className="inputTitle"
          type="text"
          placeholder="Title for activities"
        ></input>
        <label htmlFor="description"></label>
        <textarea
          name="description"
          value={note.description}
          data-testid="input-descr"
          onChange={(e: any) =>
            setNote({ ...note, description: e.target.value })
          }
          className="inputDesc"
          placeholder="Description about activities"
        ></textarea>
        <label htmlFor="time"></label>
        <input
          value={note.time}
          name="time"
          data-testid="input-time"
          onChange={(e: any) => setNote({ ...note, time: e.target.value })}
          className="inputTime"
          type="number"
          placeholder="Time in minutes"
          min={0}
          max={1440}
        ></input>
      </form>
      <label htmlFor="ok"></label>
      <AppButton name="ok" onClick={addNewNote} data-testid="add-button">
        OK
      </AppButton>
    </div>
  );
};

export default AddNote;
