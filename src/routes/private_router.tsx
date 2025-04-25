import { useContext } from "react";
import { AuthContext } from "../context";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuth = useContext(AuthContext)?.isAuth;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
