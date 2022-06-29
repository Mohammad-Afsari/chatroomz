import { useAuth } from "../store/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
  const { session } = useAuth();
  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
