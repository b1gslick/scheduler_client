import RowButton from "../UI/RowButton";
import "./RowStyles.css";
import {
  faTrash,
  faPlayCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export type RowProps = {
  id: number;
  title: string;
  description: string;
  time: number;
  remove?: any;
};

const Row = (props: RowProps) => {
  return (
    <a href="#" className="row__container">
      <h2
        className="header"
        data-testid="row-title"
        suppressContentEditableWarning={true}
      >
        {props.title}
      </h2>
      <form className="title">
        <p
          className="title"
          data-testid="row-desc"
          suppressContentEditableWarning={true}
        >
          {props.description}
        </p>
      </form>
      <form className="time">
        <p data-testid="row-timebox">
          {Math.round(props.time / 60)}:{props.time % 60}
        </p>
      </form>
      <div className="button_container">
        <RowButton icon={faPlayCircle} onClick={() => props.remove?.(props)} />
        <RowButton icon={faEdit} onClick={() => props.remove?.(props)} />
        <RowButton icon={faTrash} onClick={() => props.remove?.(props)} />
      </div>
    </a>
  );
};
export default Row;
