import { ReactNode } from "react";

export type CardHeaderProps = {
  children: ReactNode;
};

const CardHeader = (props: CardHeaderProps) => {
  return (
    <div data-testid="card-header" className="p-6 pb-0">
      {props.children}
    </div>
  );
};

export default CardHeader;
