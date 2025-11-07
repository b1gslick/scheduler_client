import { useEffect, useState } from "react";
import { NoteProps } from "../components/notes/Note";
import Modal from "../components/UI/Modal";
import AddNote from "../components/notes/AddNote";
import NotesLists from "../components/notes_list/NotesLists";
import AddNoteButton from "../components/UI/AddNoteButton";
import { useActivityService } from "../services/useActivityService";
import { useAuth } from "../hooks/auth";
import AppButton from "../components/UI/AppButton";
import Message from "../components/UI/Message";

const NotesPage = () => {
  let note: NoteProps[] = [];
  const { getAllNotes, addNotes, delteNote, editNotes } = useActivityService();
  const auth = useAuth();
  const [notes, setRows] = useState(note);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    getAllNotes().then((activities: Array<NoteProps>) => setRows(activities));
  }, []);

  const createRow = async (newPost: NoteProps) => {
    const noteAdded = await addNotes(newPost);
    // @ts-ignore
    if (noteAdded.errorMsg) {
      // @ts-ignore
      setMessage({ type: "error", text: answer.errorMsg });
      return;
    }
    const new_activities = await getAllNotes();
    setRows(new_activities);
  };

  const removeRow = async (note: NoteProps) => {
    if (note.id === undefined) {
      return;
    }
    const deleteNote = await delteNote(note.id);
    // @ts-ignore
    if (deleteNote.errorMsg) {
      // @ts-ignore
      setMessage({ type: "error", text: deleteNote.errorMsg });
      return;
    }
    const new_activities = await getAllNotes();
    setRows(new_activities);
  };

  const editRow = async (note: NoteProps) => {
    if (note.id === undefined || note === undefined) {
      return;
    }

    const editedRow = await editNotes(note.id, note);

    // @ts-ignore
    if (editedRow.errorMsg) {
      // @ts-ignore
      setMessage({ type: "error", text: answer.errorMsg });
    }

    let newNotes: NoteProps[] = notes.map((r: NoteProps) => {
      if (r.id === note.id) {
        return editedRow;
      }
      return r;
    });
    setRows([...newNotes]);
  };

  const handleLogout = () => {
    auth?.logout();
  };

  const setVisibleAddNote = (visible: boolean) => {
    setModal(visible);
  };

  return (
    <div className="container">
      <AppButton onClick={handleLogout}>Logout</AppButton>
      <div className="column">
        <Modal visible={modal} makevisible={setModal} data-testid="add-modal">
          <AddNote create={createRow} modalState={setVisibleAddNote} />
        </Modal>
        <NotesLists notes={notes} remove={removeRow} edit={editRow}>
          <AddNoteButton onClick={() => setVisibleAddNote(true)} />
        </NotesLists>
      </div>
      {message.text ? (
        <Message type={message.type as any} text={message.text} />
      ) : null}
    </div>
  );
};

export default NotesPage;
