import { ReactNode } from "react";

import Footer from "./footer";

interface DashboardMobileLayoutProps {
  children: ReactNode;
}

const DashboardMobileLayout = (props: DashboardMobileLayoutProps) => {
  return (
    <div>
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default DashboardMobileLayout;
