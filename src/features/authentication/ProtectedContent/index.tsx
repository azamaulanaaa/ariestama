import { ReactNode } from "react";

import Message from "./message";

export type LoadingProps = {
  children: ReactNode;
  isLocked: boolean;
};

const ProtectedContent = (props: LoadingProps) => {
  const opacityContent = (enable: boolean) => {
    if (enable) {
      return "opacity-60";
    }

    return "";
  };

  const displayNone = (enable: boolean) => {
    if (enable) {
      return {
        display: "none",
      };
    }

    return {};
  };

  return (
    <div className="relative">
      <div className={opacityContent(props.isLocked)}>{props.children}</div>
      <div
        data-testid="blocker"
        className="absolute top-0 bottom-0 left-0 right-0 grid place-items-center"
        style={displayNone(!props.isLocked)}
      >
        <Message className="max-w-[300px]" />
      </div>
    </div>
  );
};

export default ProtectedContent;
