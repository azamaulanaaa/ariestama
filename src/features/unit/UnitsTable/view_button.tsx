import Link from "next/link";
import { BiSolidArea } from "react-icons/bi";

type ViewButtonProps = {
  href: string;
};

const ViewButton = (props: ViewButtonProps) => {
  return (
    <Link passHref legacyBehavior href={props.href}>
      <a className="btn btn-sm">
        <BiSolidArea />
      </a>
    </Link>
  );
};

export default ViewButton;
