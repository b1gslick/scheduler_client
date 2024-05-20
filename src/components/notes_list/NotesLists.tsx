import { ReactNode } from "react";
import Note, { NoteProps } from "../notes/Note";

interface NotesListProps {
  notes: NoteProps[];
  remove: any;
  edit: any;
  children: ReactNode;
  timer: any;
}

const NotesLists = (props: NotesListProps) => {
  return (
    <ul>
      {props.notes.map((note) => (
        <li key={note.id}>
          <Note
            remove={props.remove}
            {...note}
            key={note.id}
            edit={props.edit}
            playTimer={props.timer}
          />
        </li>
      ))}
      {props.children}
    </ul>
  );
};

export default NotesLists;
