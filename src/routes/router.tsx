import { Route, Routes } from "react-router-dom";
import NotesPage from "../pages/NotesPage";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoutes from "./private_router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="*" element={<NotesPage />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
    </Routes>
  );
};

export default AppRoutes;
