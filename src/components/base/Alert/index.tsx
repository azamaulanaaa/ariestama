import Typography from '../Typography';

export interface AlertProps {
    title?: string;
    message: string;
}

function Alert(props: AlertProps) {
    const Title = () => {
        if (!props.title) return null;

        return <Typography.Heading level={4}>{props.title}</Typography.Heading>;
    };

    return (
        <div role="alert" className="border rounded p-4">
            <Title />
            <Typography.Text>{props.message}</Typography.Text>
        </div>
    );
}

export default Alert;
