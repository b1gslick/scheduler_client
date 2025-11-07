import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const PrivateRoutes = () => {
  // @ts-ignore
  const { cookies } = useAuth();
  return cookies.token ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
