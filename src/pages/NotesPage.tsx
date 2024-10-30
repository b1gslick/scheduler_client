import { useState } from "react";
import { NoteProps } from "../components/notes/Note";
import Modal from "../components/UI/Modal";
import AddNote from "../components/notes/AddNote";
import NotesLists from "../components/notes_list/NotesLists";
import AddNoteButton from "../components/UI/AddNoteButton";

const NotesPage = () => {
  let note: NoteProps[] = [];
  const [notes, setRows] = useState(note);
  const [modal, setModal] = useState(false);

  const createRow = (newPost: NoteProps) => {
    setRows([...notes, newPost]);
  };

  const removeRow = (note: NoteProps) => {
    setRows(notes.filter((n) => n.id !== note.id));
  };

  const editRow = (note: NoteProps) => {
    let newNotes: NoteProps[] = notes.map((r: NoteProps) => {
      if (r.id === note.id) {
        return note;
      }
      return r;
    });
    setRows([...newNotes]);
  };

  const setVisibleAddNote = (visible: boolean) => {
    setModal(visible);
  };

  return (
    <div className="container">
      <div className="column">
        <Modal visible={modal} makevisible={setModal} data-testid="add-modal">
          <AddNote create={createRow} modalState={setVisibleAddNote} />
        </Modal>
        <NotesLists notes={notes} remove={removeRow} edit={editRow}>
          <AddNoteButton onClick={() => setVisibleAddNote(true)} />
        </NotesLists>
      </div>
    </div>
  );
};

export default NotesPage;
