import { useAuth } from "../store/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AuthOutlet = () => {
  const { session } = useAuth();
  return !session ? <Outlet /> : <Navigate to="/" />;
};

export default AuthOutlet;
