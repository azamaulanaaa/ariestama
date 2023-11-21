import Link from "next/link";
import { HiClipboardList } from "react-icons/hi";
import { HiBuildingOffice, HiHome, HiPower } from "react-icons/hi2";

const Sidebar = () => {
  return (
    <div className="w-full max-w-[12rem]">
      <ul className="menu bg-base-200 rounded-box shadow-md">
        <li>
          <Link href="/dashboard" passHref legacyBehavior>
            <a>
              <HiHome />
              Dashboard
            </a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/companies" passHref legacyBehavior>
            <a>
              <HiBuildingOffice />
              Companies
            </a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/units" passHref legacyBehavior>
            <a>
              <HiClipboardList />
              Units
            </a>
          </Link>
        </li>
        <li>
          <Link href="/signout" passHref legacyBehavior>
            <a>
              <HiPower />
              Sign out
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
