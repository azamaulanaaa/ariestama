export interface AlertProps {
    title?: string;
    message: string;
}

function Alert(props: AlertProps) {
    if (props.title) {
        return (
            <div className="border rounded p-4">
                <p>
                    <span className="font-bold">{props.title}</span>{' '}
                    {props.message}
                </p>
            </div>
        );
    }

    return (
        <div className="border rounded p-4">
            <p>{props.message}</p>
        </div>
    );
}

export default Alert;
