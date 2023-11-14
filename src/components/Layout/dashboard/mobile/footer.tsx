import { ReactNode } from "react";
import { Button, Navbar } from "@material-tailwind/react";
import { BiSolidBell, BiSolidHome, BiUser } from "react-icons/bi";
import Link from "next/link";

type NavItemProps = {
  children: ReactNode;
  href: string;
};

function NavItem(props: NavItemProps) {
  return (
    <Link href={props.href} legacyBehavior passHref>
      <Button
        variant="text"
        className="flex-auto flex justify-center py-4 text-2xl"
      >
        {props.children}
      </Button>
    </Link>
  );
}

function NavList() {
  return (
    <div className="flex gap-4 text-gray-800">
      <NavItem href="/dashboard">
        <BiSolidHome />
      </NavItem>
      <NavItem href="/dashboard/notification">
        <BiSolidBell />
      </NavItem>
      <NavItem href="/dashboard/account">
        <BiUser />
      </NavItem>
    </div>
  );
}

const Footer = () => {
  return (
    <Navbar fullWidth className="absolute bottom-0 border-t-2 border-gray p-0">
      <NavList />
    </Navbar>
  );
};

export default Footer;
