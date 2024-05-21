import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NoteButton.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  onClick: any;
  icon: IconProp;
  id?: string;
  disabled?: boolean;
};

const NoteButton = (props: Props) => {
  return (
    <button className="note__Button" data-testid="note-button" {...props}>
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
};

export default NoteButton;
