import Alert from '@/components/Alert';

export type ToastData = {
    type: 'success' | 'error';
    message: string;
    open: boolean;
    onClose: () => void;
};

export type ToastsProps = {
    data: ToastData[];
};

const Toasts = (props: ToastsProps) => {
    return (
        <div className="absolute top-10 right-2 z-50 flex flex-col gap-2">
            {props.data.map((data, index) => {
                setTimeout(data.onClose, 5000);
                return (
                    <Alert
                        key={index}
                        type={data.type}
                        open={data.open}
                        onClose={data.onClose}
                    >
                        {data.message}
                    </Alert>
                );
            })}
        </div>
    );
};

export default Toasts;
