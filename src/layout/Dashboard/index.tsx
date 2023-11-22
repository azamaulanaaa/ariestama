import { ReactNode } from "react";
import DashboardMobileLayout from "./mobile";
import DashboardDesktopLayout from "./desktop";

export type DashboardLayoutProps = {
  children: ReactNode;
  mobile?: boolean;
};

function DashboardLayout(props: DashboardLayoutProps) {
  if (props.mobile) {
    return <DashboardMobileLayout>{props.children}</DashboardMobileLayout>;
  }

  return <DashboardDesktopLayout>{props.children}</DashboardDesktopLayout>;
}

export default DashboardLayout;
