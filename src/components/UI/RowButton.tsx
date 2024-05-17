import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RowButton.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  onClick: any;
  icon: IconProp;
};

const RowButton = (props: Props) => {
  return (
    <button className="row__Button" data-testid="row-button" {...props}>
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
};

export default RowButton;
