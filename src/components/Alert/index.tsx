import { ReactNode } from 'react';
import { Alert as AlertMT, Typography } from '@material-tailwind/react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

export type AlertProps = {
    children: ReactNode;
    type: 'success' | 'error';
    onClose?: () => void;
};

const Alert = (props: AlertProps) => {
    let color = 'red';
    let icon = <></>;
    switch (props.type) {
        case 'success':
            icon = <HiCheckCircle className="h-6 w-6" />;
            color = 'green';
            break;
        case 'error':
            icon = <HiXCircle className="h-6 w-6" />;
            color = 'red';
            break;
    }

    return (
        <AlertMT
            icon={icon}
            color={color as any}
            dismissible={
                !props.onClose
                    ? undefined
                    : {
                          onClose: props.onClose,
                      }
            }
        >
            <Typography>{props.children}</Typography>
        </AlertMT>
    );
};

export default Alert;
