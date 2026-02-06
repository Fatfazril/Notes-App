import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AuthRoute() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}