import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const authState = useAppSelector((state) => state.auth);

  if (authState.user) return <Navigate replace to="/" />;

  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-[#242d34] flex justify-center items-center">
        <div className="w-[600px] h-fit flex flex-col bg-black rounded-2xl">
          {children}
        </div>
      </div>
    </>
  );
};
