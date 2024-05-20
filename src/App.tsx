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
    // let newRow: RowProps[] = rows.map((r: RowProps) => {
    // if (r.id === row.id) {
    // return row;
    // }
    // return r;
    // });
    // setRows([...newRow]);
  };

  const playTimer = (note: NoteProps) => {};

  return (
    <Layout>
      <div className="container">
        <div className="column">
          <Modal visible={modal} setVisible={setModal}>
            <AddNote create={createRow} />
          </Modal>
          <NotesLists
            notes={notes}
            remove={removeRow}
            edit={editRow}
            timer={playTimer}
          >
            <AddNoteButton onClick={() => setModal(true)} />
          </NotesLists>
        </div>
      </div>
    </Layout>
  );
};
export default App;
