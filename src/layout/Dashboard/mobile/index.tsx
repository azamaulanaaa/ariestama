import { ReactNode } from "react";

import Footer from "./footer";

interface DashboardMobileLayoutProps {
  children: ReactNode;
}

const DashboardMobileLayout = (props: DashboardMobileLayoutProps) => {
  return (
    <div>
      <div className="text-center">
        <h1>PT ARIES TAMA TEKNIKA</h1>
      </div>
      <div className="p-2 mb-[68px]">{props.children}</div>
      <Footer />
    </div>
  );
};

export default DashboardMobileLayout;
