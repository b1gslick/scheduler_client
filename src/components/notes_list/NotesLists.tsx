import { ReactNode } from "react";
import Note, { NoteProps } from "../notes/Note";

export type NotesListProps = {
  notes: NoteProps[];
  remove: any;
  edit: any;
  children?: ReactNode;
};

const NotesLists = (props: NotesListProps) => {
  return (
    <ul>
      {props.notes.map((note, index) => (
        <li key={index}>
          <Note
            remove={props.remove}
            {...note}
            key={note.id}
            edit={props.edit}
          />
        </li>
      ))}
      {props.children}
    </ul>
  );
};

export default NotesLists;
