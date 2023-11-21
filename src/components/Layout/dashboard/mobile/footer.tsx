import { ReactNode } from "react";
import { BiSolidBell, BiSolidHome, BiSolidUser } from "react-icons/bi";
import Link from "next/link";

type NavItemProps = {
  children: ReactNode;
  href: string;
};

function NavItem(props: NavItemProps) {
  return (
    <li className="flex-auto">
      <Link href={props.href} legacyBehavior passHref>
        <a className="btn btn-ghost btn-block text-2xl">{props.children}</a>
      </Link>
    </li>
  );
}

function Footer() {
  return (
    <ul className="menu menu-lg menu-horizontal bg-base-200 w-full fixed bottom-0">
      <NavItem href="/dashboard">
        <BiSolidHome />
      </NavItem>
      <NavItem href="/dashboard/notification">
        <BiSolidBell />
      </NavItem>
      <NavItem href="/dashboard/account">
        <BiSolidUser />
      </NavItem>
    </ul>
  );
}

export default Footer;
