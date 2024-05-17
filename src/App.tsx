import "./App.css";
import { useState } from "react";
import RowLists from "./components/rows_list/RowsLists";
import AddRowButton from "./components/UI/AddRowButton";
import Modal from "./components/UI/Modal";
import AddRow from "./components/rows/AddRow";
import Layout from "./layout";
import { RowProps } from "./components/rows/Row";

const App = () => {
  let rowProps: RowProps[] = [
    {
      id: 1,
      title: "Make good app",
      description: "For this activities",
      time: 500,
    },
  ];
  const [rows, setRows] = useState(rowProps);

  const [modal, setModal] = useState(false);

  const createRow = (newPost: RowProps) => {
    setRows([...rows, newPost]);
  };

  const removeRow = (row: RowProps) => {
    setRows(rows.filter((r) => r.id !== row.id));
  };

  return (
    <Layout>
      <div className="container">
        <div className="column">
          <Modal visible={modal} setVisible={setModal}>
            <AddRow create={createRow} />
          </Modal>
          <RowLists rows={rows} remove={removeRow}>
            <AddRowButton onClick={() => setModal(true)} />
          </RowLists>
        </div>
      </div>
    </Layout>
  );
};
export default App;
