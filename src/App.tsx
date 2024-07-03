import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import NotesPage from "./pages/NotesPage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
