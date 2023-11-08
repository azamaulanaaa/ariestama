import { ReactNode } from "react";

import Header from "./header";
import Sidebar from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <div className="h-screen">
      <div className="container mx-auto">
        <Header />
          <div className="flex flex-row gap-4">
            <Sidebar />
            <div className="pt-4 flex-auto">{props.children}</div>
          </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
