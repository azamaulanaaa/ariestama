import Alert from "@/features/notification/Alert";

export type ToastData = {
  type: "success" | "error";
  message: string;
  autoCloseDuration?: number;
  onClose?: () => void;
};

export type ToastsProps = {
  data: ToastData[];
};

const Toasts = (props: ToastsProps) => {
  return (
    <div className="absolute top-10 right-2 flex flex-col gap-2 left-2 md:left-auto">
      {props.data.map((data, index) => {
        if (data.onClose) {
          if (data.autoCloseDuration) {
            setTimeout(data.onClose, data.autoCloseDuration);
          }
        }

        return (
          <Alert key={index} type={data.type} onClose={data.onClose}>
            {data.message}
          </Alert>
        );
      })}
    </div>
  );
};

export default Toasts;
