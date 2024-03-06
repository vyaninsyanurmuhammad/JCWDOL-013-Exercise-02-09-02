import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { Navigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAppSelector((state) => state.auth);

  if (!authState.user) return <Navigate replace to="/signin" />;

  return <>{children}</>;
};
