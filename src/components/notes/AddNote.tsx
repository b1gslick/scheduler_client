import { useState } from "react";
import AppButton from "../UI/AppButton";
import "./Note.css";
import { NoteProps } from "./Note";

interface AddNoteProps {
  create: (e: NoteProps) => void;
}

const AddNote = (props: AddNoteProps) => {
  const [note, setNote] = useState({
    id: 0,
    title: "",
    description: "",
    time: 0,
  });

  const addNewNote = (e: any) => {
    e.preventDefault();
    const newNote = {
      ...note,
      isFinish: false,
      id: Date.now(),
    };
    props.create(newNote);
    setNote({ id: 0, title: "", description: "", time: 0 });
  };
  return (
    <div className="note">
      <form>
        <input
          value={note.title}
          onChange={(e: any) => setNote({ ...note, title: e.target.value })}
          className="inputTitle"
          type="text"
          placeholder="Title for activities"
        ></input>
        <textarea
          value={note.description}
          onChange={(e: any) =>
            setNote({ ...note, description: e.target.value })
          }
          className="inputDesc"
          placeholder="Description about activities"
        ></textarea>
        <input
          value={note.time}
          onChange={(e: any) => setNote({ ...note, time: e.target.value })}
          className="inputTime"
          type="number"
          placeholder="Time in minutes"
          min={0}
          max={1440}
        ></input>
      </form>
      <AppButton onClick={addNewNote}>OK</AppButton>
    </div>
  );
};

export default AddNote;
