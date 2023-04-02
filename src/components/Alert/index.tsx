export interface AlertProps {
    title?: string;
    message: string;
}

function Alert(props: AlertProps) {
    const Title = () => {
        if (!props.title) return null;

        return <h5 className="font-bold">{props.title}</h5>;
    };

    return (
        <div role="alert" className="border rounded p-4">
            <Title />
            <p>{props.message}</p>
        </div>
    );
}

export default Alert;
