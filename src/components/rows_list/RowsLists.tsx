import { ReactNode } from "react";
import Row, { RowProps } from "../rows/Row";
import { TransitionGroup } from "react-transition-group";

interface RowListProps {
  rows: RowProps[];
  remove: any;
  children: ReactNode;
}

const RowLists = (props: RowListProps) => {
  return (
    <ul>
      {props.rows.map((row) => (
        <li key={row.id}>
          <Row remove={props.remove} {...row} key={row.id} />
        </li>
      ))}
      {props.children}
    </ul>
  );
};

export default RowLists;
