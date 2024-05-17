import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AddButton.css";

const AddRowButton = (props: any) => {
  return (
    <button className="row__addButton" data-testid="add-button" {...props}>
      <p>Add new row</p>
      <FontAwesomeIcon className="add_button_icon" icon={faPlus} />
    </button>
  );
};

export default AddRowButton;
