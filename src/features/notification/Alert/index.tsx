import { ReactNode } from "react";
import { BiCheckCircle, BiSolidErrorCircle, BiXCircle } from "react-icons/bi";

export type AlertProps = {
  children: ReactNode;
  type: "success" | "error";
  onClose?: () => void;
};

function Alert(props: AlertProps) {
  const conditionalClassName = {
    success: "alert-success",
    error: "alert-error",
  }[props.type];
  const Icon = {
    success: BiCheckCircle,
    error: BiSolidErrorCircle,
  }[props.type];

  const CloseButton = () => {
    if (props.onClose) {
      return (
        <button
          className="btn btn-sm btn-ghost"
          data-testid="close-button"
          onClick={props.onClose}
        >
          <BiXCircle className="h-5 w-5" />
        </button>
      );
    }

    return null;
  };

  return (
    <div role="alert" className={"alert " + conditionalClassName}>
      <Icon className="h-6 w-6" />
      <span data-testid="message" className="text-sm">
        {props.children}
      </span>
      <CloseButton />
    </div>
  );
}

export default Alert;
