import { useAuth } from "../store/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const AuthOutlet = () => {
  const { session } = useAuth();
  useEffect(() => {
    console.log("AO: rendered...");
  });

  return !session ? <Outlet /> : <Navigate to="/" />;
};

export default AuthOutlet;
