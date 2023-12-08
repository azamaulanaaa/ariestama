import { HTMLAttributes } from "react";
import { BiSolidLock } from "react-icons/bi";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {};

const Message = (props: MessageProps) => {
  return (
    <div {...props}>
      <div role="alert" className="alert">
        <BiSolidLock className="h-10 w-10" />
        <h3 className="font-bold my-0">Protected Content</h3>
        <div className="text-xs">
          You don&lsquo;t have access to this content.
        </div>
      </div>
    </div>
  );
};

export default Message;
