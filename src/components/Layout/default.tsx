import { ReactNode } from 'react';

export type DefaultLayoutProps = {
    children: ReactNode;
};

const DefaultLayout = (props: DefaultLayoutProps) => {
    return <>{props.children}</>;
};

export default DefaultLayout;
export const config = {};
