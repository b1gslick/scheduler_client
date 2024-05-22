import "./App.css";
import { useState } from "react";
import NotesLists from "./components/notes_list/NotesLists";
import AddNoteButton from "./components/UI/AddNoteButton";
import Modal from "./components/UI/Modal";
import AddNote from "./components/notes/AddNote";
import Layout from "./layout";
import { NoteProps } from "./components/notes/Note";

const App = () => {
  let note: NoteProps[] = [
    {
      id: 1,
      title: "Make good app",
      description: "For this activities",
      time: 500,
      isFinish: false,
    },
  ];
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

  return (
    <Layout>
      <div className="container">
        <div className="column">
          <Modal visible={modal} makevisible={setModal} data-testid="add-modal">
            <AddNote create={createRow} />
          </Modal>
          <NotesLists notes={notes} remove={removeRow} edit={editRow}>
            <AddNoteButton onClick={() => setModal(true)} />
          </NotesLists>
        </div>
      </div>
    </Layout>
  );
};
export default App;
