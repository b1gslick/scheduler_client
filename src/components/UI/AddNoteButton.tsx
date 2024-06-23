import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AddButton.css";

const AddNoteButton = (props: any) => {
  return (
    <button
      buttonname="add_note_button"
      className="note__addButton"
      data-testid="add-note-button"
      {...props}
    >
      <p>Add new note</p>
      <FontAwesomeIcon className="add_button_icon" icon={faPlus} />
    </button>
  );
};

export default AddNoteButton;
