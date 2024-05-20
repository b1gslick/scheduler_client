import { useState } from "react";
import AppButton from "../UI/AppButton";
import { NoteProps } from "./Note";
import "./Note.css";

type EditNoteProps = {
  edit: any;
  note: NoteProps;
};

const EditNote = (props: EditNoteProps) => {
  const [note, setEditNote] = useState(props.note);
  const editNote = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="note">
      <form>
        <input
          value={props.note.title}
          onChange={(e: any) => setEditNote({ ...note, title: e.target.value })}
          className="inputTitle"
          type="text"
          placeholder="Title for activities"
        ></input>
        <textarea
          value={props.note.description}
          onChange={(e: any) =>
            setEditNote({ ...note, description: e.target.value })
          }
          className="inputDesc"
          placeholder="Description about activities"
        ></textarea>
        <input
          value={props.note.time}
          onChange={(e: any) => setEditNote({ ...note, time: e.target.value })}
          className="inputTime"
          type="number"
          placeholder="Time in minutes"
          min={0}
          max={1440}
        ></input>
      </form>
      <AppButton onClick={() => props.edit?.(props)}>Save</AppButton>
    </div>
  );
};

export default EditNote;
