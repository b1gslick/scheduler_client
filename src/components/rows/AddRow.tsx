import { useState } from "react";
import AppButton from "../UI/AppButton";
import "./AddRow.css";
import { RowPros } from "./Row";

interface AddRowProps {
  create: (e: RowPros) => void;
}

const AddRow = (props: AddRowProps) => {
  const [row, setRow] = useState({
    id: 0,
    title: "",
    description: "",
    time: 0,
  });

  const addNewRow = (e: any) => {
    e.preventDefault();
    const newRow = {
      ...row,
      id: Date.now(),
    };
    props.create(newRow);
    setRow({ id: 0, title: "", description: "", time: 0 });
  };
  return (
    <div className="add__row">
      <form>
        <input
          value={row.title}
          onChange={(e: any) => setRow({ ...row, title: e.target.value })}
          className="inputTitle"
          type="text"
          placeholder="Title for activities"
        ></input>
        <textarea
          value={row.description}
          onChange={(e: any) => setRow({ ...row, description: e.target.value })}
          className="inputDesc"
          placeholder="Description about activities"
        ></textarea>
        <input
          value={row.time}
          onChange={(e: any) => setRow({ ...row, time: e.target.value })}
          className="inputTime"
          type="number"
          placeholder="Time in minutes"
          min={0}
          max={1440}
        ></input>
      </form>
      <AppButton onClick={addNewRow}>OK</AppButton>
    </div>
  );
};

export default AddRow;
