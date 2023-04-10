import { ReactNode } from 'react';

export interface LoadingProps {
    children?: ReactNode;
    isLoading?: boolean;
}

const Loading = (props: LoadingProps) => {
    if (!props.isLoading && !props.children) {
        return <Container />;
    }

    return (
        <div className="relative">
            {props.children}
            {<Container hidden={!props.isLoading} />}
        </div>
    );
};

const Animation = () => {
    return (
        <svg
            role="status"
            className="animate-spin h-8 w-8 rounded-full border-4 border-solid border-blue-500 border-r-transparent"
        />
    );
};
const Container = ({ hidden }: { hidden?: boolean }) => {
    if (hidden) return null;
    return (
        <div
            className="
            absolute top-0 bottom-0 left-0 right-0 
            grid place-items-center
            bg-gray-50/75
            "
        >
            <Animation />
        </div>
    );
};
export default Loading;
