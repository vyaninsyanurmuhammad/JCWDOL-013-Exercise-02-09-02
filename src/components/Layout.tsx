import { ReactNode } from "react";
import SideBar from "./Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-black text-white">
        <div className="flex flex-row h-full w-full">
          <SideBar />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
