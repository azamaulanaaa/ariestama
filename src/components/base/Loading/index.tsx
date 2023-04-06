import { ReactNode } from 'react';

export interface LoadingProps {
    children?: ReactNode;
    isLoading?: boolean;
}

const Loading = (props: LoadingProps) => {
    if (props.isLoading || props.children=== undefined)
        return (
            <div className="grid h-full place-items-center">
                <svg
                    role="status"
                    className="animate-spin h-8 w-8 rounded-full border-4 border-solid border-r-transparent"
                />
            </div>
        );

    return <>{props.children}</>;
};

export default Loading;
