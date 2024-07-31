import { Route, Routes } from "react-router-dom";
import NotesPage from "../pages/NotesPage";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotesPage />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
    </Routes>
  );
};

export default AppRoutes;
